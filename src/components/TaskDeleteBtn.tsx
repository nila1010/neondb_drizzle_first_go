"use client";

import { deleteTodo } from "@/actions/actions";
import { Button } from "./ui/button";

export default function TaskDeleteBtn({ taskId, userId }: { taskId: number; userId: number }) {
  return (
    <Button
      onClick={() => deleteTodo(taskId, userId)}
      variant="destructive">
      Delete
    </Button>
  );
}
