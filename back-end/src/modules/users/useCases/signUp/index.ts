import { TokenService } from '../../../../services/TokenService';

import { UserRepository } from '../../repository';
import { SignUpController } from './SignUpController';
import { SignUpUseCase } from './SignUpUseCase';

const userRepository = new UserRepository();
const signUpUseCase = new SignUpUseCase(userRepository, TokenService);
const signUpController = new SignUpController(signUpUseCase);

export { signUpController };
