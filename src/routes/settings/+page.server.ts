import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { and, eq } from 'drizzle-orm';
import * as schema from '$lib/db/schema';
import { LOCALAPPDATA } from '$env/static/private';

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
			medications: true,
			familyMembers: {
				with: {
					familyMember: true
				}
			}
		}
	})!;

	return {
		user
	};
}) satisfies PageServerLoad;

export const actions = {
	addFamilyMember: async ({ locals, request }) => {
		const data = await request.formData();
		const localUser = locals.user;

		if (!localUser) {
			redirect(303, '/login');
		}

		const familyMemberEmail = (data.get('familyMemberEmail') as string).toLowerCase();

		if (familyMemberEmail === localUser.email) {
			return fail(400, {
				message: 'You cannot add yourself as a family member',
				familyMemberEmail,
				ok: false
			});
		}

		if (!familyMemberEmail) {
			return fail(400, {
				message: 'Family member email is required',
				familyMemberEmail,
				ok: false
			});
		}

		const familyMember = await locals.db.query.users.findFirst({
			where: eq(schema.users.email, familyMemberEmail),
			with: {
				familyOf: true
			}
		});

		if (!familyMember) {
			return fail(400, {
				message: 'Family member not found',
				familyMemberEmail,
				ok: false
			});
		}

		const existingRelation = await locals.db.query.familyMembers.findFirst({
			where: and(
				eq(schema.familyMembers.userID, localUser.id),
				eq(schema.familyMembers.familyMemberID, familyMember.id)
			)
		});

		if (existingRelation) {
			return fail(400, {
				message: 'Family member already added',
				familyMemberEmail: '',
				ok: false
			});
		}

		await locals.db.insert(schema.familyMembers).values({
			userID: localUser.id,
			familyMemberID: familyMember.id
		});

		return {
			message: 'Family member added',
			ok: true
		};
	},
	deleteFamilyMember: async ({ locals, request }) => {
		const data = await request.formData();
		const familyId = (data.get('id') ?? -1) as number;

		if (!locals.user) {
			redirect(303, '/login');
		}

		if (familyId === -1) {
			return fail(400, {
				ok: false,
				message: 'Family relation not found'
			});
		}

		const family = await locals.db.query.familyMembers.findFirst({
			where: eq(schema.familyMembers.id, familyId),
			with: {
				user: true,
				familyMember: true
			}
		});

		if (!family) {
			return fail(400, {
				ok: false,
				message: 'Family relation not found'
			});
		}

		if (family.user.id !== locals.user.id) {
			return fail(403, {
				ok: false,
				message: 'You are not allowed to delete this family member'
			});
		}

		try {
			await locals.db.delete(schema.familyMembers).where(eq(schema.familyMembers.id, familyId));
			return {
				ok: true,
				message: 'Family member deleted'
			};
		} catch (error) {
			console.error('Error deleting family member:', error);
			return fail(400, {
				message: 'An unexpected error occurred while deleting the family member.',
				ok: false
			});
		}
	}
};
