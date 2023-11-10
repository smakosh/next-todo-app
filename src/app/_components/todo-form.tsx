import { Input } from "@/components/ui/input"

import { SubmitTodo } from "@/app/_components/submit-todo"
import { createTodo } from "@/app/actions/createTodo"

const TodoForm = () => {
  return (
    <form action={createTodo} className="flex items-center space-x-2">
      <Input
        className="flex-1"
        placeholder="Add new todo"
        type="text"
        name="title"
        required
      />
      <SubmitTodo />
    </form>
  )
}

export default TodoForm
