CREATE TABLE "intercept_signup" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"company" text,
	"role" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
