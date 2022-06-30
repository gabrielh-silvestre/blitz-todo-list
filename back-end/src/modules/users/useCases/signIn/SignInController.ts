import type { Request, Response } from "express";

import { SignInUseCase } from "./SignInUseCase";

class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.signInUseCase.execute(req.body);

    res.status(statusCode).json(payload);
  };
}

export { SignInController };
