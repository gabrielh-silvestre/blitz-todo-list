import { Router } from 'express';

import { UserValidator } from '../middleware/validators/UserValidator';

import { signUpController } from '../modules/users/useCases/signUp';

const UserRouter = Router();

UserRouter.get('/', (_req, res) => {
  res.send('Hello from UserRouter');
});

UserRouter.post('/', UserValidator.validateCreateUser, signUpController.handle);

export { UserRouter };
