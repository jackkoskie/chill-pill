import { invalidateSession } from '$lib/auth/session';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	await invalidateSession(event.locals.session!.id, event.locals);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
};
