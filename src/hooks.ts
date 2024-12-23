import { i18n } from '$lib/i18n';
export const reroute = i18n.reroute();

import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/db/schema';

let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	platform = await getPlatformProxy();
}

export const handle = (async ({ event, resolve }) => {
	if (dev && platform) {
		event.platform = {
			...event.platform,
			...platform
		};
	}

	event.locals.db = drizzle(event.platform?.env.DB as D1Database, { schema });

	return await resolve(event);
}) satisfies Handle;
