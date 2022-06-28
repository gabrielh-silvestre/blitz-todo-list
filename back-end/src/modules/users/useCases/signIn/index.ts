import { EncryptService } from "../../../../services/EncryptService";
import { TokenService } from "../../../../services/TokenService";
import { UserRepository } from "../../repository";
import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";

const userRepository = new UserRepository();
const signInUseCase = new SignInUseCase(
  userRepository,
  TokenService,
  EncryptService
);
const signInController = new SignInController(signInUseCase);

export { signInController };
