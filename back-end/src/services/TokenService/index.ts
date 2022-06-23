import { sign, verify } from 'jsonwebtoken';

import type { UserIdentifier, TokenPayload } from '../../@types/types';

import { jwtOptions, secret } from '../../config/jwt.config';

class TokenService {
  static generateToken(id: UserIdentifier): string {
    const token = sign({ data: id }, secret, jwtOptions);

    return token;
  }

  static verifyToken(token: string): UserIdentifier {
    const payload = verify(token, secret, jwtOptions) as TokenPayload;

    return payload.data;
  }
}

export { TokenService };
