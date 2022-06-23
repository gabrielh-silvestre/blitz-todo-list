import type { User } from '@prisma/client';

type UserAttributes = User;
type UserCreateAttributes = Pick<UserAttributes, 'name' | 'email' | 'password'>;
type UserIdentifier = Pick<UserAttributes, 'id'>;

type SignReturn = { token: string };

export { UserAttributes, UserCreateAttributes, UserIdentifier, SignReturn };
