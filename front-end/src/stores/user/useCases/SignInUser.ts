import type { SignInUserDto, Token } from "../../../types";

import { api } from "../../../services/Axios";

export const signInUser = async (
  user: SignInUserDto
): Promise<Token | never> => {
  const { data } = await api.post("/login", user);

  return data;
};
