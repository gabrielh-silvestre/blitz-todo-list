import type { AxiosError } from "axios";

import { useQuery } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task } from "../../../types";

import { api } from "../../../services/Axios";
import { userStore } from "../../user";

const getTaskById = async (
  userToken: string | null,
  taskId: string
): Promise<Task | null> => {
  const { data } = await api.get<Task>(`/tasks/${taskId}`, {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useGetTaskById = (id: string) => {
  const token = userStore.getState().userToken;

  return useQuery(`task:${id}`, () => getTaskById(token, id), {
    enabled: !!token,
    initialData: null,
    onError: (err: AxiosError<ApiErrorResponse>) => {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
