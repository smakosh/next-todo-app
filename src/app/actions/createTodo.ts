import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"

export const createTodo = async (formData: FormData) => {
  "use server"

  const title = formData.get("title") as string

  try {
    if (title) {
      await prisma.todo.create({
        data: {
          title,
        },
      })
    }

    return revalidatePath("/")
  } catch (e) {
    return { message: "Failed to create" }
  }
}
