import { NotFoundError } from 'restify-errors';
import { StatusCodes } from 'http-status-codes';

import type {
  ITokenService,
  IUserRepository,
} from '../../../../@types/interfaces';
import type {
  SuccessCase,
  SignReturn,
  UserAuthAttributes,
  UserAttributes,
} from '../../../../@types/types';

class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService
  ) {}

  private async isUserRegistered(
    email: string
  ): Promise<UserAttributes | never> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('Invalid credentials');
    }

    return user;
  }

  private async isUserPasswordValid(
    user: UserAttributes,
    tryPassword: string
  ): Promise<void | never> {
    const { password } = user;

    if (password !== tryPassword) {
      throw new NotFoundError('Invalid credentials');
    }
  }

  async execute(user: UserAuthAttributes): Promise<SuccessCase<SignReturn>> {
    const foundUser = await this.isUserRegistered(user.email);

    await this.isUserPasswordValid(foundUser, user.password);

    const token = this.tokenService.generateToken({ id: foundUser.id });

    return {
      statusCode: StatusCodes.OK,
      payload: { token: `Bearer ${token}` },
    };
  }
}

export { SignInUseCase };
