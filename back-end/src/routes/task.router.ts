import { Router } from 'express';

import { AuthMiddleware } from '../middleware/Auth';

import { findAllController } from '../modules/tasks/useCases/findAll';

const TaskRouter = Router();

// TaskRouter.get('/', (_req, res) => {
//   res.send('Hello from TaskRouter');
// });

TaskRouter.get('/', AuthMiddleware.handle, findAllController.handle);

export { TaskRouter };
