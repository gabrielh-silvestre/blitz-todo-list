import { Router } from 'express';

import { signUpController } from '../modules/users/useCases/signUp';

const UserRouter = Router();

UserRouter.get('/', (_req, res) => {
  res.send('Hello from UserRouter');
});

UserRouter.post('/', signUpController.handle);

export { UserRouter };
