import { TaskRepository } from "../../repository";
import { UpdateController } from "./UpdateController";
import { UpdateUseCase } from "./UpdateUseCase";

const taskRepository = new TaskRepository();
const updateUseCase = new UpdateUseCase(taskRepository);
const updateController = new UpdateController(updateUseCase);

export { updateController };
