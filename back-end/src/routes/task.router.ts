import { Router } from "express";

import { AuthMiddleware } from "../middleware/Auth";
import { TaskValidator } from "../middleware/validators/TaskValidator";
import { completeController } from "../modules/tasks/useCases/complete";
import { createController } from "../modules/tasks/useCases/create";
import { deleteController } from "../modules/tasks/useCases/delete";
import { findAllController } from "../modules/tasks/useCases/findAll";
import { findByTitleController } from "../modules/tasks/useCases/findById";
import { updateController } from "../modules/tasks/useCases/update";

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

TaskRouter.put(
  "/:id",
  AuthMiddleware.handle,
  TaskValidator.validateUpdateTask,
  updateController.handle
);

TaskRouter.patch("/:id", AuthMiddleware.handle, completeController.handle);

TaskRouter.delete("/:id", AuthMiddleware.handle, deleteController.handle);

export { TaskRouter };
