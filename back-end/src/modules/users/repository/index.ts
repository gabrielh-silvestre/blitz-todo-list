import type { IUserRepository } from "../../../@types/interfaces";
import type {
  UserAttributes,
  UserCreateAttributes,
} from "../../../@types/types";
import { prisma } from "../../prisma";

class UserRepository implements IUserRepository {
  async create(newUser: UserCreateAttributes): Promise<UserAttributes> {
    const user = await prisma.user.create({ data: newUser });

    return user;
  }

  async findById(id: string): Promise<UserAttributes | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<UserAttributes | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}

export { UserRepository };
