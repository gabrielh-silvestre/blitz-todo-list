import { Router } from 'express';

import { AuthRouter } from './auth.router';
import { TaskRouter } from './task.router';
import { UserRouter } from './user.router';

const router = Router();

router.use('/login', AuthRouter);
router.use('/user', UserRouter);
router.use('/task', TaskRouter);

export { router };
