import { TokenService } from '../../../../services/TokenService';
import { EncryptService } from '../../../../services/EncryptService';

import { UserRepository } from '../../repository';
import { SignInUseCase } from './SignInUseCase';
import { SignInController } from './SignInController';

const userRepository = new UserRepository();
const signInUseCase = new SignInUseCase(
  userRepository,
  TokenService,
  EncryptService
);
const signInController = new SignInController(signInUseCase);

export { signInController };
