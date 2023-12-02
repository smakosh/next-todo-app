import { unstable_noStore as noStore } from "next/cache"

import TodoForm from "@/app/_components/todo-form"
import { createTodo } from "@/app/actions/createTodo"
import { deleteTodo } from "@/app/actions/deleteTodo"
import { getTodos } from "@/app/actions/getTodos"
import { updateTodo } from "@/app/actions/updateTodo"

export const Todos = async () => {
  noStore()
  const todos = await getTodos()

  return (
    <TodoForm
      data={todos}
      actions={{
        create: createTodo,
        delete: deleteTodo,
        update: updateTodo,
      }}
    />
  )
}
