import { revalidatePath } from "next/cache"
import { todos as todoSchema } from "@/../db/schema"

import { db } from "@/lib/db"

export const createTodo = async (formData: FormData) => {
  "use server"

  const title = formData.get("title")

  if (typeof title !== "string") {
    throw new Error("title is not a string")
  }

  if (title) {
    await db.insert(todoSchema).values({
      title,
    })
  }

  revalidatePath("/")
}
