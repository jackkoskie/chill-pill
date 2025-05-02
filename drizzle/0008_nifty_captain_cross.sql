PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_medication_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userID` integer NOT NULL,
	`medicationID` integer NOT NULL,
	`timestamp` integer DEFAULT '"2025-04-22T16:27:29.195Z"' NOT NULL,
	`hour` integer NOT NULL,
	`skip` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`medicationID`) REFERENCES `medications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_medication_history`("id", "userID", "medicationID", "timestamp", "hour", "skip") SELECT "id", "userID", "medicationID", "timestamp", "hour", "skip" FROM `medication_history`;--> statement-breakpoint
DROP TABLE `medication_history`;--> statement-breakpoint
ALTER TABLE `__new_medication_history` RENAME TO `medication_history`;--> statement-breakpoint
PRAGMA foreign_keys=ON;