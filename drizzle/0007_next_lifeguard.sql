PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_medications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`days` integer NOT NULL,
	`time` integer NOT NULL,
	`dose` real NOT NULL,
	`units` text NOT NULL,
	`userID` integer NOT NULL,
	`quantity` real DEFAULT 0 NOT NULL,
	`warning_level` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_medications`("id", "name", "description", "days", "time", "dose", "units", "userID", "quantity", "warning_level") SELECT "id", "name", "description", "days", "time", "dose", "units", "userID", "quantity", "warning_level" FROM `medications`;--> statement-breakpoint
DROP TABLE `medications`;--> statement-breakpoint
ALTER TABLE `__new_medications` RENAME TO `medications`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_auth_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_auth_sessions`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `auth_sessions`;--> statement-breakpoint
DROP TABLE `auth_sessions`;--> statement-breakpoint
ALTER TABLE `__new_auth_sessions` RENAME TO `auth_sessions`;--> statement-breakpoint
CREATE TABLE `__new_medication_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userID` integer NOT NULL,
	`medicationID` integer NOT NULL,
	`timestamp` integer DEFAULT '"2025-04-01T22:02:30.003Z"' NOT NULL,
	`hour` integer NOT NULL,
	`skip` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`medicationID`) REFERENCES `medications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_medication_history`("id", "userID", "medicationID", "timestamp", "hour", "skip") SELECT "id", "userID", "medicationID", "timestamp", "hour", "skip" FROM `medication_history`;--> statement-breakpoint
DROP TABLE `medication_history`;--> statement-breakpoint
ALTER TABLE `__new_medication_history` RENAME TO `medication_history`;