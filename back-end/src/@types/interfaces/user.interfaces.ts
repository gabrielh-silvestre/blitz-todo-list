import { UserAttributes, UserCreateAttributes } from "../types";

interface IUserRepository {
  create(newUser: UserCreateAttributes): Promise<UserAttributes>;
  findById(id: string): Promise<UserAttributes | null>;
  findByEmail(email: string): Promise<UserAttributes | null>;
}

export { IUserRepository };
