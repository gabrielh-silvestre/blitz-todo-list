import { useCallback } from "react";
import { useMutation } from "react-query";

import type { CreateUserDto, SignInUserDto } from "../types";

import { Users } from "../services/Users";
import { userStore } from "../stores/user";
import { onQueryError, onQuerySuccess } from "../utils/Query";

export function useUsers() {
  const { userToken, setUserToken } = userStore((state) => state);

  const signUp = useCallback(() => {
    return useMutation((newUser: CreateUserDto) => Users.signUp(newUser), {
      onSuccess: (data) => {
        setUserToken(data);
        onQuerySuccess("Welcome to your new Todo List!");
      },
      onError: onQueryError,
    });
  }, []);

  const signIn = useCallback(() => {
    return useMutation((user: SignInUserDto) => Users.signIn(user), {
      onSuccess: (data) => {
        setUserToken(data);
        onQuerySuccess("Welcome back!");
      },
      onError: onQueryError,
    });
  }, []);

  const logout = useCallback(() => {
    setUserToken(null);
    onQuerySuccess("Goodbye, see you soon!");
  }, []);

  return {
    userToken,
    signUp: signUp().mutateAsync,
    signIn: signIn().mutateAsync,
    logout,
  };
}
