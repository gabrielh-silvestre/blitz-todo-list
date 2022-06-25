import { StatusCodes } from 'http-status-codes';

import type { ITaskRepository } from '../../../../@types/interfaces';
import type {
  SuccessCase,
  UserIdentifier,
  TaskReturn,
} from '../../../../@types/types';

class FindAllUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(userId: UserIdentifier): Promise<SuccessCase<TaskReturn[]>> {
    const tasks = await this.taskRepository.findAll(userId);

    return {
      statusCode: StatusCodes.OK,
      payload: tasks,
    };
  }
}

export { FindAllUseCase };
