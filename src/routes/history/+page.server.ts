import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { users } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	const { db } = locals;

	if (!locals.user) {
		redirect(303, '/login');
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, locals.user.id),
		with: {
			history: {
                with: {
                    medication: true
                },
				orderBy: (posts, { desc }) => desc(posts.timestamp)
            }
		}
	});

	if (!user) {
		redirect(303, '/login');
	}

	return { user, history: user.history };
}) satisfies PageServerLoad;
