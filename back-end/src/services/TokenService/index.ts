import { sign, verify } from 'jsonwebtoken';

import type { UserIdentifier, TokenPayload } from '../../@types/types';

import { jwtOptions, secret } from '../../config/jwt.config';

class TokenService {
  static generateToken(id: UserIdentifier): string {
    const token = sign({ data: id }, secret, jwtOptions);

    return token;
  }

  static verifyToken(bearerToken: string): UserIdentifier | null {
    try {
      const token = bearerToken.split(' ')[1];
      const payload = verify(token, secret, jwtOptions) as TokenPayload;
      return payload.data;
    } catch (err) {
      return null;
    }
  }
}

export { TokenService };
