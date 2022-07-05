import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task, UpdateTaskDto } from "../../../types";

import { userStore } from "../../user";
import { taskStore } from "..";
import { api } from "../../../services/Axios";
import { queryClient } from "../../../services/QueryClient";

type t = {
  task: UpdateTaskDto;
  taskId: string;
};

const updateTask = async (
  userToken: string | null,
  taskId: string,
  task: UpdateTaskDto
): Promise<Task> => {
  const { data } = await api.put<Task>(`/tasks/${taskId}`, task, {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useUpdateTask = () => {
  const token = userStore.getState().userToken;

  return useMutation(({ taskId, task }: t) => updateTask(token, taskId, task), {
    onSuccess: (data) => {
      toast.success("Task updated");
      queryClient.invalidateQueries("tasks");
      queryClient.invalidateQueries(`task:${data.id}`);

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
