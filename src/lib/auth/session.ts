import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { authSessions, users, type AuthSession, type User } from '$lib/db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	token: string,
	userId: number,
	locals: App.Locals
): Promise<AuthSession> {
	const { db } = locals;
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: AuthSession = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(authSessions).values(session);
	return session;
}

export async function validateSessionToken(
	token: string,
	locals: App.Locals
): Promise<SessionValidationResult> {
	const { db } = locals;

	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: users, session: authSessions })
		.from(authSessions)
		.innerJoin(users, eq(authSessions.userId, users.id))
		.where(eq(authSessions.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(authSessions).where(eq(authSessions.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(authSessions)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(authSessions.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(sessionId: string, locals: App.Locals): Promise<void> {
	const { db } = locals;
	await db.delete(authSessions).where(eq(authSessions.id, sessionId));
	console.log('Invalidated session');
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

export function auth(event: RequestEvent): Promise<SessionValidationResult> {
	const token = event.cookies.get('session');
	if (!token) {
		return Promise.resolve({ session: null, user: null });
	}
	return validateSessionToken(token, event.locals);
}

export type SessionValidationResult =
	| { session: AuthSession; user: User }
	| { session: null; user: null };

export async function getUserFromGoogleId(
	googleUserId: string,
	locals: App.Locals
): Promise<User | undefined> {
	const { db } = locals;

	const user = db.query.users.findFirst({
		where: eq(users.googleId, googleUserId)
	});

	return user;
}

export async function createUser(
	googleUserId: string,
	username: string,
	email: string,
	locals: App.Locals
): Promise<User> {
	const { db } = locals;

	await db.insert(users).values({
		name: username,
		email,
		googleId: googleUserId
	});

	const user = await getUserFromGoogleId(googleUserId, locals);

	return user!;
}
