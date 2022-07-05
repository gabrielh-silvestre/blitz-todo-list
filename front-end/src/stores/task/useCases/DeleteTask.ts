import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task } from "../../../types";

import { userStore } from "../../user";
import { api } from "../../../services/Axios";
import { queryClient } from "../../../services/QueryClient";

const deleteTask = async (
  userToken: string | null,
  taskId: string
): Promise<Task> => {
  const { data } = await api.delete<Task>(`/tasks/${taskId}`, {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useDeleteTask = (id: string) => {
  const token = userStore.getState().userToken;

  return useMutation(() => deleteTask(token, id), {
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries("tasks");
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
