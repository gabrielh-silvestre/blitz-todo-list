import type { Request, Response } from "express";

import { DeleteUseCase } from "./DeleteUseCase";

class DeleteController {
  constructor(private readonly deleteUseCase: DeleteUseCase) {}

  handle = async (req: Request, res: Response) => {
    const { statusCode, payload } = await this.deleteUseCase.execute(
      req.userId,
      req.params.id
    );

    res.status(statusCode).json(payload);
  };
}

export { DeleteController };
