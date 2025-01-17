import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/db/schema';
import { sequence } from '@sveltejs/kit/hooks';

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

export const handle = sequence(database);
