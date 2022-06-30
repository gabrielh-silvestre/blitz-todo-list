import { compare, hash } from "bcryptjs";

class EncryptService {
  static async encrypt(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);

    return hashedPassword;
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await compare(password, hash);

    return isValid;
  }
}

export { EncryptService };
