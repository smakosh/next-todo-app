import { Skeleton } from "@/components/ui/skeleton"

const LoadingTodo = () => {
  return [0, 1, 2].map((item) => (
    <Skeleton
      key={`todo-${item}`}
      className="h-[100px] w-[100px] rounded-full"
    />
  ))
}

export default LoadingTodo
