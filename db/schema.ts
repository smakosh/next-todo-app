import {
  boolean,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const todos = mysqlTable("Todo", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 191 }),
  done: boolean("done").default(false),
  published: boolean("published").default(false),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).defaultNow(),
})
