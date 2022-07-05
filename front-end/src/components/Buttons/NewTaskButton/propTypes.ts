import type { Task } from "../../../types";

export type NewTaskProps = Pick<Task, "title" | "description" | "mainTaskId">;
