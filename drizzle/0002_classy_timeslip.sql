ALTER TABLE `users` ADD `googleId` text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_googleId_unique` ON `users` (`googleId`);