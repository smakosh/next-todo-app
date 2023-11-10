import { notFound } from "next/navigation"

import { prisma } from "@/lib/prisma"
import EditTodoForm from "@/app/todo/[id]/_components/edit-todo-form"

type TodoProps = { params: { id: string } }

export default async function Todo({ params }: TodoProps) {
  const todo = await prisma.todo.findFirst({
    where: {
      id: Number(params.id),
    },
  })

  if (!todo) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center bg-blue-500 py-4 text-white">
        <h1 className="text-2xl font-bold">Edit Todo</h1>
      </header>
      <main className="flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-800">
        <EditTodoForm id={todo.id} title={todo.title} content={todo.content} />
      </main>
    </div>
  )
}
