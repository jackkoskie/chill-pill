import { eq, and } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import * as schema from '$lib/db/schema';

type Medication = {
	id?: number;
	name: string;
	days: number;
	time: number;
	description: string;
	dose: number;
	units: string;
	warningLevel: number;
	quantity: number;
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return new Response(null, { status: 403 });
	}

	const body = (await request.json()) as Medication;

	const medication = await locals.db.query.medications.findFirst({
		where: and(eq(schema.medications.id, body.id!), eq(schema.medications.userID, locals.user.id))
	});

	if (!medication) {
		return new Response(null, { status: 404 });
	}

	if (medication.userID !== locals.user.id) {
		return new Response(null, { status: 403 });
	}

	await locals.db
		.update(schema.medications)
		.set({
			name: body.name,
			days: body.days,
			time: body.time,
			description: body.description,
			dose: body.dose,
			units: body.units,
			quantity: body.quantity,
			warningLevel: body.warningLevel
		})
		.where(and(eq(schema.medications.id, body.id!), eq(schema.medications.userID, locals.user.id)));

	return new Response();
};

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return new Response(null, { status: 403 });
	}

	const body = (await request.json()) as Medication;

	const med = await locals.db
		.insert(schema.medications)
		.values({
			userID: locals.user.id,
			name: body.name,
			days: body.days | 0,
			time: body.time | 0,
			description: body.description,
			dose: body.dose | 0,
			units: body.units,
			quantity: body.quantity,
			warningLevel: body.warningLevel
		})
		.returning();

	return new Response(JSON.stringify({ med: med[0] }));
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		return new Response(null, { status: 403 });
	}

	const body = (await request.json()) as {
		id: number;
	};

	const medication = await locals.db.query.medications.findFirst({
		where: eq(schema.medications.id, body.id)
	});

	if (!medication) {
		return new Response(null, { status: 404 });
	}

	if (medication.userID !== locals.user.id) {
		return new Response(null, { status: 403 });
	}

	await locals.db.delete(schema.medications).where(eq(schema.medications.id, body.id));

	return new Response();
};
