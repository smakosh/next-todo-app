import type { Config } from "drizzle-kit"

import "dotenv/config"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required.")
}

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  breakpoints: true,
} satisfies Config
