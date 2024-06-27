import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const userTable = pgTable("user_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
});
export const usersTodo = pgTable("users_todos", {
  id: serial("id").primaryKey(),
  finished: boolean("finished").default(false).notNull(),
  todo: text("todo").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const userTableRelations = relations(userTable, ({ one, many }) => {
  return {
    todos: many(usersTodo),
  };
});

export const usersTodoRelations = relations(usersTodo, ({ one, many }) => {
  return {
    todos: one(userTable, { fields: [usersTodo.userId], references: [userTable.id] }),
  };
});
export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type InsertPost = typeof usersTodo.$inferInsert;
export type SelectPost = typeof usersTodo.$inferSelect;
