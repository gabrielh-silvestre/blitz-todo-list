import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task } from "../../../types";

import { userStore } from "../../user";
import { api } from "../../../services/Axios";
import { queryClient } from "../../../services/QueryClient";

const completeTask = async (
  userToken: string | null,
  taskId: string
): Promise<Task> => {
  const { data } = await api.patch<Task>(
    `/tasks/${taskId}`,
    {},
    {
      headers: {
        Authorization: userToken || "",
      },
    }
  );

  return data;
};

export const useCompleteTask = () => {
  const token = userStore.getState().userToken;

  return useMutation((taskId: string) => completeTask(token, taskId), {
    onSuccess: (data) => {
      toast.success("Task completed!");
      queryClient.invalidateQueries("tasks");
      queryClient.invalidateQueries(`task:${data.id}`);
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
