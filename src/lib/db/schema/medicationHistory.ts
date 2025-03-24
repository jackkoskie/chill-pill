import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { medications } from './medications';

export const medicationHistories = sqliteTable('medication_history', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	userID: int()
		.notNull()
		.references(() => users.id),
	medicationID: int()
		.notNull()
		.references(() => medications.id),
	timestamp: int({ mode: 'timestamp_ms' }).notNull().default(new Date()),
	hour: int().notNull(), // 0-23 the hours of the day it was taken
	skip: int({ mode: 'boolean' }).notNull().default(false)
});

export const medicationHistoriesRelation = relations(medicationHistories, ({ one, many }) => ({
	user: one(users, {
		fields: [medicationHistories.userID],
		references: [users.id]
	}),
	medication: one(medications, {
		fields: [medicationHistories.medicationID],
		references: [medications.id]
	})
}));

export type MedicationHistory = InferSelectModel<typeof medicationHistories>;
