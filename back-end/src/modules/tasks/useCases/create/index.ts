import { TaskRepository } from "../../repository";
import { CreateController } from "./CreateController";
import { CreateUseCase } from "./CreateUseCase";

const taskRepository = new TaskRepository();
const createUseCase = new CreateUseCase(taskRepository);
const createController = new CreateController(createUseCase);

export { createController };
