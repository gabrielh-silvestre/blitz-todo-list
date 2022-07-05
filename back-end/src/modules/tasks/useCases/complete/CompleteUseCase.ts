import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "restify-errors";

import type { ITaskRepository } from "../../../../@types/interfaces";
import type {
  SuccessCase,
  TaskReturn,
  UserIdentifier,
} from "../../../../@types/types";

class CompleteUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async taskExists(
    userId: UserIdentifier,
    taskId: string
  ): Promise<void | never> {
    const task = await this.taskRepository.findById(userId, taskId);

    if (!task) {
      throw new NotFoundError("Task not found");
    }
  }

  async execute(
    userId: UserIdentifier,
    taskId: string
  ): Promise<SuccessCase<TaskReturn> | never> {
    await this.taskExists(userId, taskId);

    const task = await this.taskRepository.changeStatus(userId, taskId, "DONE");

    return {
      statusCode: StatusCodes.OK,
      payload: task,
    };
  }
}

export { CompleteUseCase };
