import type { UserIdentifier } from '../types';

interface ITokenService {
  generateToken(id: UserIdentifier): string;
  verifyToken(token: string): UserIdentifier;
}

interface IEncryptService {
  encrypt(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}

export { ITokenService, IEncryptService };
