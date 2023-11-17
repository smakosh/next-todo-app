import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { todos as todoSchema } from "@/../db/schema"
import { eq, InferSelectModel } from "drizzle-orm"

import { db } from "@/lib/db"

export const updateTodo = async (
  todoConfig: Pick<InferSelectModel<typeof todoSchema>, "id" | "done">,
  formData: FormData
) => {
  "use server"

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (title && content) {
    await db
      .update(todoSchema)
      .set({
        title,
        content,
      })
      .where(eq(todoSchema.id, todoConfig.id))
  } else {
    await db
      .update(todoSchema)
      .set({
        done: !todoConfig.done,
      })
      .where(eq(todoSchema.id, todoConfig.id))
  }

  revalidatePath("/")
  redirect("/")
}
