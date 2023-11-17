import Link from "next/link"
import { notFound } from "next/navigation"
import { todos as todoSchema } from "@/../db/schema"
import { like } from "drizzle-orm"

import { db } from "@/lib/db"
import EditTodoForm from "@/app/todo/[id]/_components/edit-todo-form"

type TodoProps = { params: { id: string } }

export default async function Todo({ params }: TodoProps) {
  if (!params.id) {
    notFound()
  }

  const todos = await db
    .select()
    .from(todoSchema)
    .where(like(todoSchema.id, params.id))

  const todo = todos[0]

  if (!todo) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center bg-blue-500 py-4 text-white">
        <h1 className="text-2xl font-bold">Edit Todo</h1>
      </header>
      <main className="flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-800">
        <div className="container">
          <Link href="/" className="text-black">
            Go Back
          </Link>
        </div>
        <EditTodoForm id={todo.id} title={todo.title} content={todo.content} />
      </main>
    </div>
  )
}
