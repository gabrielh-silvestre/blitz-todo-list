import type { AxiosError } from "axios";

import { useQuery } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task } from "../../../types";

import { api } from "../../../services/Axios";
import { userStore } from "../../user";

const getAllTasks = async (userToken: string | null): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/tasks", {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useGetAllTasks = () => {
  const token = userStore.getState().userToken;

  return useQuery("tasks", () => getAllTasks(token), {
    enabled: !!token,
    initialData: [],
    onError: (err: AxiosError<ApiErrorResponse>) => {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
