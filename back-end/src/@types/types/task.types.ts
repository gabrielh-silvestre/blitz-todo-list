import type { Task } from '@prisma/client';

type TaskAttributes = Task;
type TaskReturn = Omit<TaskAttributes, 'userId'>;

type TaskCreateAttributes = Pick<
  TaskAttributes,
  'title' | 'description' | 'mainTaskId'
>;

type TaskUpdateAttributes = TaskCreateAttributes &
  Pick<TaskAttributes, 'status' | 'id'>;

type TaskReturnOptions = {
  [key in keyof TaskReturn]: boolean;
};

export {
  TaskAttributes,
  TaskCreateAttributes,
  TaskUpdateAttributes,
  TaskReturn,
  TaskReturnOptions,
};
