import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const medications = sqliteTable('medications', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	description: text(),
	days: int(),
	time: int(),
	dose: real(),
	units: text(),
	userID: int()
		.notNull()
		.references(() => users.id)
});

export const medicationsRelations = relations(medications, ({ one, many }) => ({
	user: one(users, {
		fields: [medications.userID],
		references: [users.id]
	})
}));

export type Medication = InferSelectModel<typeof medications>;
