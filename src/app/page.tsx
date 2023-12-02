import { Suspense } from "react"

import LoadingTodo from "@/app/_components/loading-todo"
import { Todos } from "@/app/_components/todos"

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-center bg-blue-500 py-4 text-white">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <main className="flex-1 bg-gray-50 px-4 py-6 dark:bg-gray-800">
        <div className="mx-auto max-w-lg">
          <Suspense fallback={<LoadingTodo />}>
            <Todos />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
