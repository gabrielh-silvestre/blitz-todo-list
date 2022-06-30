import { StatusCodes } from "http-status-codes";
import { ConflictError, NotFoundError } from "restify-errors";

import type { ITaskRepository } from "../../../../@types/interfaces";
import type {
  SuccessCase,
  TaskCreateAttributes,
  TaskReturn,
  UserIdentifier,
} from "../../../../@types/types";

class CreateUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  private async mainTaskDoesNotExist(
    userId: UserIdentifier,
    mainTaskId: string | null
  ): Promise<void | never> {
    if (!mainTaskId) return;

    const task = await this.taskRepository.findById(userId, mainTaskId);

    if (!task) {
      throw new NotFoundError("Main task does not exist");
    }
  }

  private async titleAlreadyExists(
    userId: UserIdentifier,
    title: string
  ): Promise<void | never> {
    const task = await this.taskRepository.findByTitle(userId, title);

    if (task) {
      throw new ConflictError("Task already exists");
    }
  }

  async execute(
    userId: UserIdentifier,
    attributes: TaskCreateAttributes
  ): Promise<SuccessCase<TaskReturn> | never> {
    await this.titleAlreadyExists(userId, attributes.title);
    await this.mainTaskDoesNotExist(userId, attributes.mainTaskId);

    const task = await this.taskRepository.create(userId, attributes);

    return {
      statusCode: StatusCodes.CREATED,
      payload: task,
    };
  }
}

export { CreateUseCase };
