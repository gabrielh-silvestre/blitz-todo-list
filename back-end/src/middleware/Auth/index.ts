import { Handler } from "express";
import { UnauthorizedError } from "restify-errors";

import type { ITokenService } from "../../@types/interfaces";
import { TokenService } from "../../services/TokenService";

class AuthHandler {
  constructor(private readonly tokenService: ITokenService) {}

  handle: Handler = (req, _res, next) => {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedError("Unauthorized");

    const userId = this.tokenService.verifyToken(token);

    if (!userId) throw new UnauthorizedError("Expired or invalid token");

    req.userId = userId;

    next();
  };
}

export const AuthMiddleware = new AuthHandler(TokenService);
