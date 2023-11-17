import Link from "next/link"
import { todos as todoSchema } from "@/../db/schema"
import { Button } from "@/components/ui/button"
import { InferSelectModel } from "drizzle-orm"

import { cn } from "@/lib/utils"
import { updateTodo } from "@/app/actions/updateTodo"

import { deleteTodo } from "../actions/deleteTodo"

type TodoItemProps = Pick<
  InferSelectModel<typeof todoSchema>,
  "id" | "title" | "content" | "done"
>

const TodoItem = ({ id, title, content, done }: TodoItemProps) => {
  const updateTodoWithId = updateTodo.bind(null, { id, done })
  const deleteTodoWithId = deleteTodo.bind(null, id)

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
          <form action={updateTodoWithId}>
            <Button type="submit" variant="outline">
              {done ? "Undone" : "Done"}
            </Button>
          </form>

          <form action={deleteTodoWithId}>
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
