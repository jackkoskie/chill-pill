import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { medications } from './medications';
import { medicationHistories } from './medicationHistory';

export const users = sqliteTable('users', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	email: text().notNull(),
	googleId: text().unique()
});

export const usersRelations = relations(users, ({ one, many }) => ({
	medications: many(medications),
	history: many(medicationHistories)
}));

export type User = InferSelectModel<typeof users>;
