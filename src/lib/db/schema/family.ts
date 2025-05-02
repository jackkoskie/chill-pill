import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, real, sqliteTable } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const familyMembers = sqliteTable('family_members', {
	id: int().primaryKey({ autoIncrement: true }).notNull(),
	userID: int()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	familyMemberID: int()
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' })
});

export const familyMemberRelations = relations(familyMembers, ({ one, many }) => ({
	user: one(users, {
		// account being accessed
		fields: [familyMembers.userID],
		references: [users.id],
		relationName: 'familyMembers'
	}),
	familyMember: one(users, {
		// account accessing the data
		fields: [familyMembers.familyMemberID],
		references: [users.id],
		relationName: 'familyOf'
	})
}));

export type FamilyMember = InferSelectModel<typeof familyMembers>;
