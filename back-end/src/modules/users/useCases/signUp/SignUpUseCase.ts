import { ConflictError } from 'restify-errors';
import { StatusCodes } from 'http-status-codes';

import type {
  ITokenService,
  IUserRepository,
} from '../../../../@types/interfaces';
import type {
  SuccessCase,
  SignReturn,
  UserCreateAttributes,
} from '../../../../@types/types';

class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService
  ) {}

  private async isUniqueEmail(email: string): Promise<void | never> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ConflictError('Email already registered');
    }
  }

  async execute(
    newUser: UserCreateAttributes
  ): Promise<SuccessCase<SignReturn>> {
    await this.isUniqueEmail(newUser.email);

    const { id } = await this.userRepository.create(newUser);

    const token = this.tokenService.generateToken({ id });

    return {
      statusCode: StatusCodes.CREATED,
      payload: { token: `Bearer ${token}` },
    };
  }
}

export { SignUpUseCase };
