import { TokenService } from '../../../../services/TokenService';

import { UserRepository } from '../../repository';
import { SignInUseCase } from './SignInUseCase';
import { SignInController } from './SignInController';

const userRepository = new UserRepository();
const signInUseCase = new SignInUseCase(userRepository, TokenService);
const signInController = new SignInController(signInUseCase);

export { signInController };
