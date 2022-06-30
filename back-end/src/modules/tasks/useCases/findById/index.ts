import { TaskRepository } from "../../repository";
import { FindByIdController } from "./FindByIdController";
import { FindByIdUseCase } from "./FindByIdUseCase";

const taskRepository = new TaskRepository();
const findByTitleUseCase = new FindByIdUseCase(taskRepository);
const findByTitleController = new FindByIdController(findByTitleUseCase);

export { findByTitleController };
