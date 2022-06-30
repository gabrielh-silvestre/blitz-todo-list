import type { Request, Response } from "express";

import { CreateUseCase } from "./CreateUseCase";

class CreateController {
  constructor(private readonly createUseCase: CreateUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.createUseCase.execute(
      req.userId,
      req.body
    );

    res.status(statusCode).json(payload);
  };
}

export { CreateController };
