CREATE TABLE `medications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`days` integer,
	`time` integer,
	`dose` real,
	`units` text,
	`userID` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
