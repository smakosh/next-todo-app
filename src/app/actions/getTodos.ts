import { todos } from "@/../db/schema"
import { InferSelectModel } from "drizzle-orm"

import { db } from "@/lib/db"

export type Todo = InferSelectModel<typeof todos>

export async function getTodos() {
  try {
    const todosResult: Todo[] = await db.select().from(todos)
    return todosResult
  } catch (err) {
    if (err instanceof Error) console.log(err.stack)
  }
}
