import type {
  FetchMethods,
  CreateTaskDto,
  Task,
  UpdateTaskDto,
} from "../../types";

import { api } from "../Axios";
import { queryClient } from "../QueryClient";

export class Tasks {
  private static _userToken: string =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiY2w0cTI4ZGdlMDAwMTNhODJ5aHQ1a2x4biJ9LCJpYXQiOjE2NTcyMTc4MDIsImV4cCI6MTY1NzQ3NzAwMn0.dW3Xj_PG67HUIxQHOofzLtWHqCtL1TU-XxBPc2wMoXo";

  private static async fetchTasks<T>(
    method: FetchMethods,
    taskData: Task | {} = {},
    identifier?: string
  ) {
    const path = identifier ? `/tasks/${identifier}` : "/tasks";

    if (method === "get" || method === "delete") {
      const { data } = await api[method]<T>(path, {
        headers: { Authorization: Tasks._userToken || "" },
      });

      return data;
    }

    const { data } = await api[method]<T>(path, taskData, {
      headers: { Authorization: Tasks._userToken || "" },
    });

    return data;
  }

  static set userToken(token: string) {
    Tasks._userToken = token;
  }

  static async getAllTasks() {
    return Tasks.fetchTasks<Task[]>("get");
  }

  static async getTask(taskId: string) {
    return Tasks.fetchTasks<Task>("get", {}, taskId);
  }

  static async createTask(newTask: CreateTaskDto) {
    const result = await Tasks.fetchTasks<Task>("post", newTask);
    queryClient.invalidateQueries("tasks");
    return result;
  }

  static async updateTask(taskId: string, task: UpdateTaskDto) {
    const result = await Tasks.fetchTasks<Task>("put", task, taskId);
    queryClient.invalidateQueries("tasks");
    return result;
  }

  static async completeTask(taskId: string) {
    const result = await Tasks.fetchTasks<Task>("patch", {}, taskId);
    queryClient.invalidateQueries("tasks");
    return result;
  }

  static async deleteTask(taskId: string) {
    const result = await Tasks.fetchTasks<Task>("delete", {}, taskId);
    queryClient.invalidateQueries("tasks");
    return result;
  }
}
