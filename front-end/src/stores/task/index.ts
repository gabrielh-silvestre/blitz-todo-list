import create from "zustand";
import { devtools } from "zustand/middleware";

import type { Task } from "../../types";

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  subTaskMode: boolean;
  setSubTaskMode: (subTaskMode: boolean) => void;
};

export const taskStore = create(
  devtools<TaskStore>((set) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    selectedTask: null,
    setSelectedTask: (selectedTask) => set({ selectedTask }),
    editMode: false,
    setEditMode: (editMode) => set({ editMode }),
    subTaskMode: false,
    setSubTaskMode: (subTaskMode) => set({ subTaskMode }),
  }))
);
