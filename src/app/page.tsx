import TodoForm from "./_components/todo-form"
import TodoItem from "./_components/todo-item"
import { getTodos } from "./actions/getTodos"

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center bg-blue-500 py-4 text-white">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-800">
        <div className="mx-auto max-w-lg">
          <TodoForm />
          {todos && todos.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {todos.map(({ id, title, content, done }) => (
                <TodoItem
                  key={id}
                  id={id}
                  done={done}
                  content={content}
                  title={title}
                />
              ))}
            </ul>
          ) : null}
        </div>
      </main>
    </div>
  )
}
