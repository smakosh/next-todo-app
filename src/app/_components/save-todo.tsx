"use client"

import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export function SaveTodo() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      aria-disabled={pending}
    >
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}
