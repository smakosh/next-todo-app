import { Skeleton } from "@/components/ui/skeleton"

const LoadingTodo = () => {
  return (
    <ul className="mt-4 space-y-2">
      {[0, 1, 2, 4].map((item) => (
        <li key={`todo-${item}`} className="flex flex-col space-y-2">
          <Skeleton className="h-[100px] w-full rounded" />
        </li>
      ))}
    </ul>
  )
}

export default LoadingTodo
