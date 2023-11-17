CREATE TABLE `Todo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` varchar(191),
	`done` boolean DEFAULT false,
	`published` boolean DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `Todo_id` PRIMARY KEY(`id`)
);
