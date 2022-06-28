import { Request, Response } from "express";

import { FindAllUseCase } from "./FindAllUseCase";

class FindAllController {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.findAllUseCase.execute(
      req.userId
    );

    res.status(statusCode).json(payload);
  };
}

export { FindAllController };
