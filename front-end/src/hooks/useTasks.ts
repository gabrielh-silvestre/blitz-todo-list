import { useCallback } from "react";
import { useMutation, useQuery } from "react-query";

import type { CreateTaskDto, UpdateTaskDto } from "../types";

import { Tasks } from "../services/Tasks";
import { taskStore } from "../stores/task";
import { onQueryError, onQuerySuccess } from "../utils/Query";

export function useTasks() {
  const {
    tasks,
    setTasks,
    selectedTask,
    setSelectedTask,
    editMode,
    setEditMode,
    subTaskMode,
    setSubTaskMode,
  } = taskStore((state) => state);

  const getAllTasks = useCallback(async () => {
    return useQuery("tasks", () => Tasks.getAllTasks(), {
      onSuccess: (data) => setTasks(data),
      onError: onQueryError,
    });
  }, []);

  const getTaskById = useCallback(() => {
    return useMutation((id: string) => Tasks.getTask(id), {
      onSuccess: (data) => setSelectedTask(data),
      onError: onQueryError,
    });
  }, []);

  const createTask = useCallback(() => {
    return useMutation((task: CreateTaskDto) => Tasks.createTask(task), {
      onSuccess: () => onQuerySuccess("Task created"),
      onError: onQueryError,
    });
  }, []);

  const updateTask = useCallback(() => {
    return useMutation(
      (task: UpdateTaskDto) => Tasks.updateTask(selectedTask!.id, task),
      {
        onSuccess: () => onQuerySuccess("Task updated"),
        onError: onQueryError,
      }
    );
  }, []);

  const completeTask = useCallback(() => {
    return useMutation((taskId: string) => Tasks.completeTask(taskId), {
      onSuccess: () => onQuerySuccess("Task completed"),
      onError: onQueryError,
    });
  }, []);

  const deleteTask = useCallback(() => {
    return useMutation((taskId: string) => Tasks.deleteTask(taskId), {
      onSuccess: () => onQuerySuccess("Task deleted"),
      onError: onQueryError,
    });
  }, []);

  return {
    tasks,
    selectedTask,
    editMode,
    subTaskMode,
    setSelectedTask,
    setEditMode,
    setSubTaskMode,
    getAllTasks,
    getTaskById: getTaskById().mutateAsync,
    createTask: createTask().mutateAsync,
    updateTask: updateTask().mutateAsync,
    completeTask: completeTask().mutateAsync,
    deleteTask: deleteTask().mutateAsync,
  };
}
