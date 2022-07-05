import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task } from "../../../types";

import { userStore } from "../../user";
import { taskStore } from "..";
import { api } from "../../../services/Axios";

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

  return useMutation(`task:${id}`, (id: string) => getTaskById(token, id), {
    onSuccess: (data) => {
      taskStore.setState({ selectedTask: data, editMode: false });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
