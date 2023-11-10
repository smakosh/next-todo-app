import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Todo } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export const updateTodo = async (
  todoConfig: Partial<Todo>,
  formData: FormData
) => {
  "use server"

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (title && content) {
    await prisma.todo.update({
      data: {
        title,
        content,
      },
      where: {
        id: todoConfig.id,
      },
    })
  } else {
    await prisma.todo.update({
      data: {
        done: !todoConfig.done,
      },
      where: {
        id: todoConfig.id,
      },
    })
  }

  revalidatePath("/")
  redirect("/")
}
