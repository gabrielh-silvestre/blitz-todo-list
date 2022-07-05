import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { CreateUserDto, Token } from "../../../types";

import { userStore } from "..";
import { api } from "../../../services/Axios";

const signUpUser = async (user: CreateUserDto): Promise<Token> => {
  const { data } = await api.post<Token>("/users", user);

  return data;
};

export const useSignUpUser = () => {
  return useMutation((user: CreateUserDto) => signUpUser(user), {
    onSuccess: (data) => {
      userStore.setState({ userToken: data.token });
      toast.success("Welcome to your Todo List!");
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
