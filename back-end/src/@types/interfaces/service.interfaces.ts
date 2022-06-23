import type { UserIdentifier } from '../types';

interface ITokenService {
  generateToken(id: UserIdentifier): string;
  verifyToken(token: string): UserIdentifier;
}

export { ITokenService };
