import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { medicationHistories } from './medicationHistory';

export const medications = sqliteTable('medications', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	description: text(),
	days: int().notNull(),
	time: int().notNull(),
	dose: real().notNull(),
	units: text().notNull(),
	userID: int()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	quantity: real().notNull().default(0),
	warningLevel: real('warning_level').notNull().default(0)
});

export const medicationsRelations = relations(medications, ({ one, many }) => ({
	user: one(users, {
		fields: [medications.userID],
		references: [users.id]
	}),
	history: many(medicationHistories)
}));

export type Medication = InferSelectModel<typeof medications>;
