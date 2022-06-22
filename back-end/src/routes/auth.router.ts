import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.get('/', (_req, res) => {
  res.send('Hello from AuthRouter');
});

export { AuthRouter };
