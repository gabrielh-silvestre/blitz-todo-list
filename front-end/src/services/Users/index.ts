import type { CreateUserDto, SignInUserDto, Token } from "../../types";

import { api } from "../Axios";

export class Users {
  static async signUp(newUser: CreateUserDto) {
    const { data } = await api.post<Token>("/users", newUser);
    return data.token;
  }

  static async signIn(user: SignInUserDto) {
    const { data } = await api.post<Token>("/login", user);
    return data.token;
  }
}
