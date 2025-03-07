import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import * as schema from '$lib/db/schema';

export const PATCH: RequestHandler = async ({ request, locals }) => {
	const body = (await request.json()) as {
		id: number;
		name: string;
		days: number;
		time: number;
		description: string;
		dose: number;
		units: string;
	};

	const medication = await locals.db.query.medications.findFirst({
		where: eq(schema.medications.id, body.id)
	});

	if (!medication) {
		return new Response(null, { status: 404 });
	}

	if (medication.userID !== locals.user!.id) {
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
			units: body.units
		})
		.where(eq(schema.medications.id, body.id));

	return new Response();
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	const body = (await request.json()) as {
		id: number;
	};

	const medication = await locals.db.query.medications.findFirst({
		where: eq(schema.medications.id, body.id)
	});

	if (!medication) {
		return new Response(null, { status: 404 });
	}

	if (medication.userID !== locals.user!.id) {
		return new Response(null, { status: 403 });
	}

	await locals.db.delete(schema.medications).where(eq(schema.medications.id, body.id));

	return new Response();
};
