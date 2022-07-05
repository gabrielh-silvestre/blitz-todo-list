import type { CreateUserDto, Token } from "../../../types";

import { api } from "../../../services/Axios";

export const signUpUser = async (
  user: CreateUserDto
): Promise<Token | null> => {
  const { data } = await api.post("/users", user);

  return data;
};
