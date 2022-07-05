export type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: "CREATED" | "IN_PROGRESS" | "DONE" | "DELETED";
  mainTaskId?: string | null;
  subTasks?: Task[];
  createdAt: Date;
  completedAt?: Date;
  lastUpdate?: Date;
};

export type CreateTaskDto = Pick<Task, "title" | "description" | "mainTaskId">;

export type UpdateTaskDto = Pick<
  Task,
  "id" | "title" | "description" | "status"
>;
