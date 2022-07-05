import type { Request, Response } from "express";

import { CompleteUseCase } from "./CompleteUseCase";

class CompleteController {
  constructor(private readonly completeUseCase: CompleteUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.completeUseCase.execute(
      req.userId,
      req.params.id
    );

    res.status(statusCode).json(payload);
  };
}

export { CompleteController };
