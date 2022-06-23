import type { Handler } from 'express';
import { SignUpUseCase } from './SignUpUseCase';

class SignUpController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  handle: Handler = async (req, res) => {
    const { statusCode, payload } = await this.signUpUseCase.execute(req.body);

    res.status(statusCode).json(payload);
  };
}

export { SignUpController };
