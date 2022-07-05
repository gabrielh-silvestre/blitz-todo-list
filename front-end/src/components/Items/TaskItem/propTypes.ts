import { Task } from "../../../types";

export type TaskItemProps = Pick<
  Task,
  "id" | "title" | "status"
>;
