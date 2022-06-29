import type { Request, Response } from "express";

import { FindByIdUseCase } from "./FindByIdUseCase";

class FindByIdController {
  constructor(private readonly findByTitleUseCase: FindByIdUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { statusCode, payload } = await this.findByTitleUseCase.execute(
      req.userId,
      id
    );

    res.status(statusCode).json(payload);
  };
}

export { FindByIdController };
