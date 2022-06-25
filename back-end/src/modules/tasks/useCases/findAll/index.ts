import { TaskRepository } from '../../repository';
import { FindAllUseCase } from './FindAllUseCase';
import { FindAllController } from './FindAllController';

const taskRepository = new TaskRepository();
const findAllUseCase = new FindAllUseCase(taskRepository);
const findAllController = new FindAllController(findAllUseCase);

export { findAllController };
