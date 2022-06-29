import { Router } from "express";

import { AuthMiddleware } from "../middleware/Auth";
import { findAllController } from "../modules/tasks/useCases/findAll";
import { findByTitleController } from "../modules/tasks/useCases/findById";

const TaskRouter = Router();

// TaskRouter.get('/', (_req, res) => {
//   res.send('Hello from TaskRouter');
// });

TaskRouter.get("/", AuthMiddleware.handle, findAllController.handle);
TaskRouter.get("/:id", AuthMiddleware.handle, findByTitleController.handle);

export { TaskRouter };
