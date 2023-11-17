import { revalidatePath } from "next/cache"
import { todos as todoSchema } from "@/../db/schema"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"

export const deleteTodo = async (id: number) => {
  "use server"

  await db.delete(todoSchema).where(eq(todoSchema.id, id))

  revalidatePath("/")
}
