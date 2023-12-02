"use client"

import { FormEvent, useId, useOptimistic } from "react"
import { todos as todoSchema } from "@/../db/schema"
import { Input } from "@/components/ui/input"
import { InferSelectModel } from "drizzle-orm"

import { SubmitTodo } from "@/app/_components/submit-todo"
import TodoItem from "@/app/_components/todo-item"
import type { Todo } from "@/app/actions/getTodos"

type TodoFormProps = {
  actions: {
    create: (formData: FormData) => Promise<void>
    delete: (id: number) => Promise<void>
    update: (
      todoConfig: Pick<InferSelectModel<typeof todoSchema>, "id" | "done">,
      formData: FormData
    ) => Promise<never>
  }
  data: Todo[] | undefined
}

export type CrudTodo = {
  title?: string
  id?: number
  done?: boolean
  type: "create" | "delete" | "update"
}

const TodoForm = ({ actions, data }: TodoFormProps) => {
  const toodId = useId()
  const [optimisticTodos, crudTodo] = useOptimistic<
    Todo[] | undefined,
    CrudTodo
  >(data || [], (state, action) => {
    switch (action.type) {
      case "create":
        const newTodo: Todo = {
          id: Number(toodId),
          title: action.title || "",
          content: null,
          done: false,
          published: false,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        }

        // @ts-ignore: tried my best here
        return [...state, newTodo]
      case "update":
        const updatedTodos = state!.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                title: action.title,
                done: action.done,
              }
            : todo
        )
        return updatedTodos
      case "delete":
        const remainingTodos = state!.filter((todo) => todo.id !== action.id)
        return remainingTodos
      default:
        return state
    }
  })

  const handleFormAction = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement

    const titleInput = form.elements.namedItem(
      "title"
    ) as HTMLInputElement | null

    if (!titleInput) {
      return null
    }

    const title = titleInput.value

    if (typeof title !== "string") {
      return null
    }

    crudTodo({
      type: "create",
      title,
    })
    await actions.create(new FormData(form))
  }

  return (
    <>
      <form
        onSubmit={handleFormAction}
        action={actions.create}
        className="flex items-center space-x-2"
      >
        <Input
          className="flex-1"
          placeholder="Add new todo"
          type="text"
          name="title"
          required
        />
        <SubmitTodo />
      </form>
      {optimisticTodos && optimisticTodos.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {optimisticTodos.map(({ id, title, content, done }) => (
            <TodoItem
              key={id}
              id={id}
              done={done}
              content={content}
              title={title}
              updateTodo={actions.update}
              deleteTodo={actions.delete}
              crudTodo={crudTodo}
            />
          ))}
        </ul>
      ) : null}
    </>
  )
}

export default TodoForm
