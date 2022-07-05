export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDto = Pick<User, "name" | "email" | "password">;

export type SignInUserDto = Omit<CreateUserDto, "name">;
