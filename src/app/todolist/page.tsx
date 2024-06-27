import { getTodos } from "@/actions/actions";
import AddTask from "@/components/AddTask";
import AddTaskInput from "@/components/AddTaskInput";
import TaskDeleteBtn from "@/components/TaskDeleteBtn";

export default async function todoList({ searchParams }: { searchParams: string }) {
  const params = new URLSearchParams(searchParams);
  const username = params.get("username") as string;

  const todos = await getTodos(Number(username));

  return (
    <>
      <h1>Todo-list</h1>
      <ul className="grid gap-2 my-5">
        {todos.map(
          (todo, i) =>
            !todo.finished && (
              <li
                className="flex gap-5 items-center"
                key={i}>
                <AddTaskInput todo={todo} />
                <p className="grow">{todo.todo}</p>
                <TaskDeleteBtn
                  taskId={todo.taskId}
                  userId={todo.userId}
                />
              </li>
            )
        )}
      </ul>

      <AddTask username={username} />

      <ul className="grid gap-2 my-5">
        {todos.map(
          (todo, i) =>
            todo.finished && (
              <li
                className="flex gap-5 items-center"
                key={i}>
                <AddTaskInput todo={todo} />
                <p className="grow">{todo.todo}</p>
                <TaskDeleteBtn
                  taskId={todo.taskId}
                  userId={todo.userId}
                />
              </li>
            )
        )}
      </ul>
    </>
  );
}
