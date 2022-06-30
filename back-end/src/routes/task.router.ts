import { Router } from "express";

import { AuthMiddleware } from "../middleware/Auth";
import { TaskValidator } from "../middleware/validators/TaskValidator";
import { createController } from "../modules/tasks/useCases/create";
import { findAllController } from "../modules/tasks/useCases/findAll";
import { findByTitleController } from "../modules/tasks/useCases/findById";

const TaskRouter = Router();

// TaskRouter.get('/', (_req, res) => {
//   res.send('Hello from TaskRouter');
// });

TaskRouter.get("/", AuthMiddleware.handle, findAllController.handle);
TaskRouter.get("/:id", AuthMiddleware.handle, findByTitleController.handle);

TaskRouter.post(
  "/",
  AuthMiddleware.handle,
  TaskValidator.validateCreateTask,
  createController.handle
);

export { TaskRouter };
