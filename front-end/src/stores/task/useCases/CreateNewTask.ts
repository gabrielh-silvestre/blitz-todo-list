import type { AxiosError } from "axios";

import { useMutation } from "react-query";
import toast from "react-hot-toast";

import type { ApiErrorResponse, Task, CreateTaskDto } from "../../../types";

import { taskStore } from "..";
import { userStore } from "../../user";
import { api } from "../../../services/Axios";
import { queryClient } from "../../../services/QueryClient";

const createNewTask = async (
  userToken: string | null,
  task: CreateTaskDto
): Promise<Task> => {
  const { data } = await api.post<Task>("/tasks", task, {
    headers: {
      Authorization: userToken || "",
    },
  });

  return data;
};

export const useCreateNewTask = () => {
  const token = userStore.getState().userToken;

  return useMutation(
    (newTask: CreateTaskDto) => createNewTask(token, newTask),
    {
      onSuccess: (data) => {
        toast.success("Task created");
        queryClient.invalidateQueries("tasks");

        taskStore.setState({ selectedTask: data, editMode: false });
      },
      onError: (err: AxiosError<ApiErrorResponse>) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      },
    }
  );
};
