import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { SignInUserDto, Token } from "../../../types";

import { userStore } from "..";
import { api } from "../../../services/Axios";

const signInUser = async (user: SignInUserDto): Promise<Token | never> => {
  const { data } = await api.post("/login", user);

  return data;
};

export const useSignInUser = () => {
  return useMutation((user: SignInUserDto) => signInUser(user), {
    onSuccess: (data) => {
      userStore.setState({ userToken: data.token });
      toast.success("You are in!");
    },
    onError: (err: AxiosError<any>) => {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
