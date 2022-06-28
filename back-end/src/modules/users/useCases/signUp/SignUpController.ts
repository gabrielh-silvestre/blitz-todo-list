import type { Request, Response } from "express";

import { SignUpUseCase } from "./SignUpUseCase";

class SignUpController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.signUpUseCase.execute(req.body);

    res.status(statusCode).json(payload);
  };
}

export { SignUpController };
