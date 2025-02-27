import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
	
	if ( !locals.user ) {
		redirect(303, '/login');
	}
	return {};
}) satisfies PageServerLoad;
