export type Task = {
  id: string;
  title: string;
  description: string;
  status: "CREATED" | "IN_PROGRESS" | "DONE" | "DELETED";
  mainTaskId?: string;
  subTasks?: Task[];
  createdAt: Date;
  completedAt?: Date;
  lastUpdate?: Date;
};
