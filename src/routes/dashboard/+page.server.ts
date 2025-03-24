import { eq, gt } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { medications, users } from '$lib/db/schema';
import { redirect } from '@sveltejs/kit';
import { intToDay, intToTime } from '$lib/utils/converter';

export const load = (async ({ locals }) => {
	const { db } = locals;

	if (!locals.user) {
		redirect(303, '/login');
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, locals.user.id),
		with: {
			medications: {
				with: {
					history: {
						orderBy: (posts, { desc }) => desc(posts.timestamp)
					}
				}
			}
		}
	});

	if (!user) {
		redirect(303, '/login');
	}

	if (!user.medications) {
		// If user has no medications, redirect to settings so they can add medications
		redirect(303, '/settings');
	}

	return { user, medications: user.medications };
}) satisfies PageServerLoad;
