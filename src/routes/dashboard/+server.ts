import { medicationHistories, medications } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		return new Response(null, { status: 403 });
	}

	const body = (await request.json()) as {
		medId: number;
		userId: number;
		hour: number;
		skip: boolean;
	};

	if (!body) {
		return new Response(null, { status: 400 });
	}

	if (body.userId !== locals.user.id) {
		return new Response(null, { status: 403 });
	}

	await locals.db.insert(medicationHistories).values({
		hour: body.hour,
		medicationID: body.medId,
		userID: body.userId,
		skip: body.skip,
		timestamp: new Date()
	});

	if (!body.skip) {
		const med = await locals.db.query.medications.findFirst({
			where: eq(medications.id, body.medId)
		});

		if (!med) {
			return new Response(null, { status: 404 });
		}

		await locals.db
			.update(medications)
			.set({ quantity: med?.quantity - med?.dose })
			.where(eq(medications.id, body.medId));
	}

	const med = await locals.db.query.medications.findFirst({
		where: eq(medications.id, body.medId),
		with: {
			history: true
		}
	});

	return new Response(JSON.stringify(med), { status: 201 });
};
