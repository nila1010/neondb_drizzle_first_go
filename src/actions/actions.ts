"use server";
import { db } from "@/db/db";
import { userTable, usersTodo } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addUser(name: string, password: string) {
  const user = await db
    .insert(userTable)
    .values({
      name,
      password,
    })
    .returning({ userId: userTable.id });
  return user[0].userId;
}

export async function addTodo(prevState: any, formData: FormData) {
  const username = formData.get("userId") as string;
  try {
    await db.insert(usersTodo).values({
      todo: formData.get("todo") as string,
      userId: Number(username),
    });
    revalidatePath("/todolist?username=" + prevState.userId);
    return {
      message: "Todo added",
    };
  } catch (error) {
    return {
      message: "Todo not added",
    };
  }
}

export async function getTodos(userId: number) {
  const todos = await db.select({ userId: userTable.id, todo: usersTodo.todo, taskId: usersTodo.id, finished: usersTodo.finished }).from(userTable).where(eq(userTable.id, userId)).innerJoin(usersTodo, eq(userTable.id, usersTodo.userId));
  return todos;
}

export async function changeStatus(todoId: number, status: boolean, userId: number) {
  await db
    .update(usersTodo)
    .set({
      finished: status,
    })
    .where(eq(usersTodo.id, todoId));

  revalidatePath("/todolist?username=" + userId);
}

export async function deleteTodo(taskId: number, userId: number) {
  await db.delete(usersTodo).where(eq(usersTodo.id, taskId));
  revalidatePath("/todolist?username=" + userId);
}
