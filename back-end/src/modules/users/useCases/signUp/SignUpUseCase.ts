import { StatusCodes } from "http-status-codes";
import { ConflictError } from "restify-errors";

import type {
  IEncryptService,
  ITokenService,
  IUserRepository,
} from "../../../../@types/interfaces";
import type {
  SuccessCase,
  SignReturn,
  UserCreateAttributes,
} from "../../../../@types/types";

class SignUpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: ITokenService,
    private readonly encryptService: IEncryptService
  ) {}

  private async isUniqueEmail(email: string): Promise<void | never> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ConflictError("Email already registered");
    }
  }

  private async hashPassword(
    user: UserCreateAttributes
  ): Promise<UserCreateAttributes> {
    const hashedPassword = await this.encryptService.encrypt(user.password);

    return {
      ...user,
      password: hashedPassword,
    };
  }

  async execute(
    newUser: UserCreateAttributes
  ): Promise<SuccessCase<SignReturn>> {
    await this.isUniqueEmail(newUser.email);

    const hashedUser = await this.hashPassword(newUser);

    const { id } = await this.userRepository.create(hashedUser);

    const token = this.tokenService.generateToken({ id });

    return {
      statusCode: StatusCodes.CREATED,
      payload: { token: `Bearer ${token}` },
    };
  }
}

export { SignUpUseCase };
