import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "restify-errors";

import type { ITaskRepository } from "../../../../@types/interfaces";
import type { SuccessCase, UserIdentifier } from "../../../../@types/types";

class DeleteUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  private async taskExists(
    userId: UserIdentifier,
    taskId: string
  ): Promise<void | never> {
    const task = await this.taskRepository.findById(userId, taskId);

    if (!task) {
      throw new NotFoundError("Task does not exist");
    }
  }

  async execute(
    userId: UserIdentifier,
    taskId: string
  ): Promise<SuccessCase<null> | never> {
    await this.taskExists(userId, taskId);

    await this.taskRepository.delete(userId, taskId);

    return {
      statusCode: StatusCodes.NO_CONTENT,
      payload: null,
    };
  }
}

export { DeleteUseCase };
