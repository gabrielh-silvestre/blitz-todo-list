import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task, UpdateTaskDto } from "../../../types";

import { userStore } from "../../user";
import { api } from "../../../services/Axios";
import { queryClient } from "../../../services/QueryClient";

const updateTask = async (
  userToken: string | null,
  task: UpdateTaskDto
): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${task.id}`, task, {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useUpdateTask = (task: UpdateTaskDto) => {
  const token = userStore.getState().userToken;

  return useMutation(() => updateTask(token, task), {
    onSuccess: () => {
      toast.success("Task updated");
      queryClient.invalidateQueries("tasks");
      queryClient.invalidateQueries(`task:${task.id}`);
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
