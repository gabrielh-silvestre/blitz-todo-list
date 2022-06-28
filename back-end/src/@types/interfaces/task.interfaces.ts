import type {
  TaskCreateAttributes,
  TaskReturn,
  TaskUpdateAttributes,
  UserIdentifier,
} from "../types";

interface ITaskRepository {
  findAll(userId: UserIdentifier): Promise<TaskReturn[]>;
  findById(userId: UserIdentifier, taskId: string): Promise<TaskReturn | null>;
  findByTitle(
    userId: UserIdentifier,
    title: string
  ): Promise<TaskReturn | null>;
  findByMainTaskId(
    userId: UserIdentifier,
    mainTaskId: string
  ): Promise<TaskReturn[]>;

  create(
    userId: UserIdentifier,
    attributes: TaskCreateAttributes
  ): Promise<TaskReturn>;

  update(
    userId: UserIdentifier,
    attributes: TaskUpdateAttributes
  ): Promise<TaskReturn>;

  delete(userId: UserIdentifier, taskId: string): Promise<void>;
}

export { ITaskRepository };
