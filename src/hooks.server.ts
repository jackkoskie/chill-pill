import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/db/schema';
import { sequence } from '@sveltejs/kit/hooks';
import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/auth/session';

let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	platform = await getPlatformProxy();
}

const database: Handle = async ({ event, resolve }) => {
	if (dev && platform) {
		event.platform = {
			...event.platform,
			...platform
		};
	}

	event.locals.db = drizzle(event.platform?.env.DB as D1Database, { schema });

	return await resolve(event);
};

const session: Handle = async ({ event, resolve }) => {
	const { locals } = event;

	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token, locals);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return await resolve(event);
};

export const handle = sequence(database, session);
