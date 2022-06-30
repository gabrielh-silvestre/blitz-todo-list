import { NotFoundError } from "restify-errors";

import type { ITaskRepository } from "../../../../@types/interfaces";
import type {
  SuccessCase,
  TaskReturn,
  UserIdentifier,
} from "../../../../@types/types";

class FindByIdUseCase {
  constructor(private readonly tasksRepository: ITaskRepository) {}

  async execute(
    userId: UserIdentifier,
    id: string
  ): Promise<SuccessCase<TaskReturn>> {
    const task = await this.tasksRepository.findById(userId, id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return {
      statusCode: 200,
      payload: task,
    };
  }
}

export { FindByIdUseCase };
