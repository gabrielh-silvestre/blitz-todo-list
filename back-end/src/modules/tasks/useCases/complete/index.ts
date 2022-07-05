import { TaskRepository } from "../../repository";
import { CompleteController } from "./CompleteController";
import { CompleteUseCase } from "./CompleteUseCase";

const taskRepository = new TaskRepository();
const completeUseCase = new CompleteUseCase(taskRepository);
const completeController = new CompleteController(completeUseCase);

export { completeController };
