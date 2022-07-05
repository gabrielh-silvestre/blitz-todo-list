import create from "zustand";
import { devtools } from "zustand/middleware";

import type { Task } from "../../types";

type TaskStore = {
  tasks: Task[];
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
};

export const taskStore = create(
  devtools<TaskStore>((set) => ({
    tasks: [],
    selectedTask: null,
    setSelectedTask: (task) => set({ selectedTask: task }),
    editMode: true,
    setEditMode: (editMode: boolean) => set({ editMode }),
  }))
);
