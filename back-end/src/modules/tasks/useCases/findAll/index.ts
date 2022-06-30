import { TaskRepository } from "../../repository";
import { FindAllController } from "./FindAllController";
import { FindAllUseCase } from "./FindAllUseCase";

const taskRepository = new TaskRepository();
const findAllUseCase = new FindAllUseCase(taskRepository);
const findAllController = new FindAllController(findAllUseCase);

export { findAllController };
