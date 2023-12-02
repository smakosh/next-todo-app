import { FormEvent } from "react"
import Link from "next/link"
import { todos as todoSchema } from "@/../db/schema"
import { Button } from "@/components/ui/button"
import { InferSelectModel } from "drizzle-orm"

import { cn } from "@/lib/utils"
import type { CrudTodo } from "@/app/_components/todo-form"

type TodoItemProps = Pick<
  InferSelectModel<typeof todoSchema>,
  "id" | "title" | "content" | "done"
> & {
  deleteTodo: (id: number) => Promise<void>
  updateTodo: (
    todoConfig: Pick<InferSelectModel<typeof todoSchema>, "id" | "done">,
    formData: FormData
  ) => Promise<never>
  crudTodo: (action: CrudTodo) => void
}

const TodoItem = ({
  id,
  title,
  content,
  done,
  updateTodo,
  deleteTodo,
  crudTodo,
}: TodoItemProps) => {
  const updateTodoWithId = updateTodo.bind(null, { id, done })
  const deleteTodoWithId = deleteTodo.bind(null, id)

  const handleUpdateAction = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement

    crudTodo({
      type: "update",
      id,
      done: !done,
    })
    await updateTodoWithId(new FormData(form))
  }

  const handleDeleteAction = async (e: FormEvent) => {
    e.preventDefault()

    crudTodo({
      type: "delete",
      id,
    })
    await deleteTodoWithId()
  }

  return (
    <li className="flex flex-col space-y-2 rounded bg-white p-4 shadow dark:bg-gray-700">
      <div className="flex items-center justify-between">
        <Link href={`/todo/${id}`}>
          <h4
            className={cn({
              "line-through": done,
            })}
          >
            {title}
          </h4>
        </Link>
        <div className="flex space-x-2">
          <form onSubmit={handleUpdateAction} action={updateTodoWithId}>
            <Button type="submit" variant="outline">
              {done ? "Undone" : "Done"}
            </Button>
          </form>

          <form onSubmit={handleDeleteAction} action={deleteTodoWithId}>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{content}</p>
    </li>
  )
}

export default TodoItem
