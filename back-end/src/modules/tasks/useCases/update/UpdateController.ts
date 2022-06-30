import type { Request, Response } from "express";

import { UpdateUseCase } from "./UpdateUseCase";

class UpdateController {
  constructor(private readonly updateUseCase: UpdateUseCase) {}

  handle = async (req: Request, res: Response) => {
    const attributes = { ...req.body, id: req.params.id };

    const { statusCode, payload } = await this.updateUseCase.execute(
      req.userId,
      attributes
    );

    res.status(statusCode).json(payload);
  };
}

export { UpdateController };
