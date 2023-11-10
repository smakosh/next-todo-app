import { Input } from "@/components/ui/input"
import type { Todo } from "@prisma/client"

import { SaveTodo } from "@/app/_components/save-todo"
import { updateTodo } from "@/app/actions/updateTodo"

const EditTodoForm = ({
  id,
  title,
  content,
}: Pick<Todo, "id" | "title" | "content">) => {
  const handleUpdateTodo = updateTodo.bind(null, { id })
  return (
    <form action={handleUpdateTodo} className="mx-auto max-w-lg">
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300"
          htmlFor="title"
        >
          Title:
        </label>
        <Input
          className="w-full rounded-lg border px-3 py-2 text-gray-700 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
          defaultValue={title || "Walk the dog"}
          id="title"
          name="title"
          type="text"
          value={title}
        />
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300"
          htmlFor="content"
        >
          Description:
        </label>
        <textarea
          className="w-full resize-none rounded-lg border px-3 py-2 text-gray-700 focus:outline-none dark:bg-gray-700 dark:text-gray-300"
          defaultValue={content || "Description for walking the dog."}
          id="content"
          name="content"
          rows={4}
        >
          {content}
        </textarea>
      </div>
      <div className="flex justify-end">
        <SaveTodo />
      </div>
    </form>
  )
}

export default EditTodoForm
