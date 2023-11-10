import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"

export const deleteTodo = async (id: number) => {
  "use server"

  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    })

    return revalidatePath("/")
  } catch (e) {
    return { message: "Failed to create" }
  }
}
