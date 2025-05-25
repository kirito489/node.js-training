CREATE TABLE "heroes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"gender" char(1),
	"age" integer,
	"hero_level" char(1) NOT NULL,
	"hero_rank" integer,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "monsters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"danger_level" char(1) NOT NULL,
	"kill_by" integer,
	"description" text
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
DROP TABLE "posts" CASCADE;--> statement-breakpoint
ALTER TABLE "monsters" ADD CONSTRAINT "fk_kill_by" FOREIGN KEY ("kill_by") REFERENCES "public"."heroes"("id") ON DELETE set null ON UPDATE restrict;