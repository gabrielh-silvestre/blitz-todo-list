import { StatusCodes } from "http-status-codes";
import { ConflictError, NotFoundError } from "restify-errors";

import type { ITaskRepository } from "../../../../@types/interfaces";
import type {
  SuccessCase,
  TaskReturn,
  TaskUpdateAttributes,
  UserIdentifier,
} from "../../../../@types/types";

class UpdateUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  private async titleAlreadyExists(
    userId: UserIdentifier,
    id: string,
    title: string
  ): Promise<void | never> {
    const task = await this.taskRepository.findByTitle(userId, title);

    if (!task) return;

    if (task.id !== id) {
      throw new ConflictError("Task already exists");
    }
  }

  async taskExists(
    userId: UserIdentifier,
    taskId: string
  ): Promise<void | never> {
    const task = await this.taskRepository.findById(userId, taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }
  }

  async mainTaskExists(
    userId: UserIdentifier,
    mainTaskId: string | null
  ): Promise<void | never> {
    if (!mainTaskId) return;
    const task = await this.taskRepository.findById(userId, mainTaskId);

    if (!task) {
      throw new NotFoundError("Main task does not exist");
    }
  }

  public async execute(
    userId: UserIdentifier,
    attributes: TaskUpdateAttributes
  ): Promise<SuccessCase<TaskReturn> | never> {
    await this.titleAlreadyExists(userId, attributes.id, attributes.title);
    await this.taskExists(userId, attributes.id);
    await this.mainTaskExists(userId, attributes.mainTaskId);

    const task = await this.taskRepository.update(userId, attributes);

    return {
      statusCode: StatusCodes.OK,
      payload: task,
    };
  }
}

export { UpdateUseCase };
