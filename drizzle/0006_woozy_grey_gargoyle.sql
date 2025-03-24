CREATE TABLE `medication_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userID` integer NOT NULL,
	`medicationID` integer NOT NULL,
	`timestamp` integer DEFAULT '"2025-03-20T16:48:46.930Z"' NOT NULL,
	`hour` integer NOT NULL,
	`skip` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`medicationID`) REFERENCES `medications`(`id`) ON UPDATE no action ON DELETE no action
);
