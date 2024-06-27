"use client";
import { Input } from "./ui/input";
import { changeStatus } from "@/actions/actions";

type TTodos = {
  userId: number;
  todo: string;
  taskId: number;
  finished: boolean;
};

type AddTaskProps = {
  todo: TTodos;
};

export default function AddTaskInput({ todo }: AddTaskProps) {
  function changeStatusInput() {
    changeStatus(todo.taskId, !todo.finished, todo.userId);
  }

  return (
    <Input
      onChange={changeStatusInput}
      className={`w-6 h-6 `}
      type="checkbox"
      checked={todo.finished}
    />
  );
}
