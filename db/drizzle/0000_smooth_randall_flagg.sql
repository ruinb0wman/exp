CREATE TABLE `product_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`issued_at` integer NOT NULL,
	`expires_at` integer,
	`used_at` integer,
	`metadata` text,
	FOREIGN KEY (`template_id`) REFERENCES `product_templates`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `product_instance_user_status_idx` ON `product_instances` (`user_id`,`status`);--> statement-breakpoint
CREATE TABLE `product_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`points_cost` integer NOT NULL,
	`type` text DEFAULT 'consumable' NOT NULL,
	`valid_duration` integer DEFAULT 0 NOT NULL,
	`max_per_user` integer DEFAULT -1 NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`replenishment_mode` text DEFAULT 'none' NOT NULL,
	`replenishment_interval` integer,
	`replenishment_days_of_week` text,
	`replenishment_days_of_month` text,
	`last_replenished_at` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subtask_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`template_id`) REFERENCES `task_templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `task_instance_subtasks` (
	`instance_id` integer NOT NULL,
	`subtask_template_id` integer NOT NULL,
	PRIMARY KEY(`instance_id`, `subtask_template_id`),
	FOREIGN KEY (`instance_id`) REFERENCES `task_instances`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subtask_template_id`) REFERENCES `subtask_templates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task_instances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`template_id` integer NOT NULL,
	`user_id` integer NOT NULL,
	`scheduled_date` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`completed_at` integer,
	`awarded_points` integer NOT NULL,
	FOREIGN KEY (`template_id`) REFERENCES `task_templates`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `task_instance_user_date_idx` ON `task_instances` (`user_id`,`scheduled_date`);--> statement-breakpoint
CREATE INDEX `task_instance_template_date_unique` ON `task_instances` (`template_id`,`scheduled_date`);--> statement-breakpoint
CREATE TABLE `task_templates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`reward_points` integer NOT NULL,
	`repeat_mode` text NOT NULL,
	`repeat_interval` integer,
	`repeat_days_of_week` text,
	`repeat_days_of_month` text,
	`end_condition` text NOT NULL,
	`end_value` text,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_points` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`balance` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);