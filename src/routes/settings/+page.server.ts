import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import * as schema from '$lib/db/schema';

export const load = (async ({ locals }) => {
	const localUser = locals.user;

	if (!localUser) {
		redirect(303, '/login');
	}

	const user = await locals.db.query.users.findFirst({
		where: eq(schema.users.id, localUser.id),
		columns: {
			googleId: false,
			email: false
		},
		with: {
			medications: true
		}
	})!;

	return {
		user
	};
}) satisfies PageServerLoad;
