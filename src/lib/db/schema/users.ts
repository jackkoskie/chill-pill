import { relations, type InferSelectModel } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {});

export const usersRelations = relations(users, ({ one, many }) => ({}));

export type User = InferSelectModel<typeof users>;
