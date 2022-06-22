import { Router } from 'express';

const TaskRouter = Router();

TaskRouter.get('/', (_req, res) => {
  res.send('Hello from TaskRouter');
});

export { TaskRouter };
