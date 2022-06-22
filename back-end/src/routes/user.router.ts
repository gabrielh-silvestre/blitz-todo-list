import { Router } from 'express';

const UserRouter = Router();

UserRouter.get('/', (_req, res) => {
  res.send('Hello from UserRouter');
});

export { UserRouter };
