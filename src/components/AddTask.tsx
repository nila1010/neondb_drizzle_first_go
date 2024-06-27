"use client";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/actions";
import { Button } from "@/components/ui/button";

type AddTaskProps = {
  username: string;
};

const initialState = {
  message: "",
};

export default function AddTask({ username }: AddTaskProps) {
  const [state, formAction] = useFormState(addTodo, initialState);
  return (
    <form
      action={formAction}
      className="flex gap-5 items-center">
      <Input
        type="text"
        name="todo"
        placeholder="Add todo"
      />
      <Input
        type="text"
        name="userId"
        className="hidden"
        defaultValue={username}
      />
      <Button>Add todo</Button>
      <p
        aria-live="polite"
        className="sr-only"
        role="status">
        {state?.message}
      </p>
    </form>
  );
}
