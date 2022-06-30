import { TaskRepository } from "../../repository";
import { DeleteController } from "./DeleteController";
import { DeleteUseCase } from "./DeleteUseCase";

const taskRepository = new TaskRepository();
const deleteUseCase = new DeleteUseCase(taskRepository);
const deleteController = new DeleteController(deleteUseCase);

export { deleteController };
