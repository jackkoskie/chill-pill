import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { medications } from './medications';
import { medicationHistories } from './medicationHistory';
import { familyMembers } from './family';

export const users = sqliteTable('users', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	email: text().notNull(),
	googleId: text().unique()
});

export const usersRelations = relations(users, ({ one, many }) => ({
	medications: many(medications),
	history: many(medicationHistories),
	familyMembers: many(familyMembers, { relationName: 'familyMembers' }), // users who can see their data
	familyOf: many(familyMembers, { relationName: 'familyOf' }) // users who's data they can see
}));

export type User = InferSelectModel<typeof users>;
