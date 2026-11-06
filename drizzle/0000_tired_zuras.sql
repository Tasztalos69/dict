CREATE TABLE `words` (
	`word` text PRIMARY KEY NOT NULL,
	`definition` text NOT NULL,
	`type` text NOT NULL,
	`synonym_group` text,
	CONSTRAINT "words_type" CHECK("words"."type" IN ('fn', 'mn', 'ige')),
	CONSTRAINT "words_synonym_group_not_empty" CHECK("words"."synonym_group" <> '')
);
--> statement-breakpoint
CREATE INDEX `words_synonym_group` ON `words` (`synonym_group`);