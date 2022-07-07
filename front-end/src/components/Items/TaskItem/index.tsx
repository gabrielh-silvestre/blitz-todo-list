import type { MouseEvent } from "react";

import { CompleteTaskButton } from "../../Buttons/CompleteTaskButton";
import { DeleteTaskButton } from "../../Buttons/DeleteTaskButton";

import type { TaskItemProps } from "./propTypes";

import { useTasks } from "../../../hooks/useTasks";

import { ButtonContainer, ContentContainer, TaskTitle } from "./styles";

export function TaskItem({ id, status, title }: TaskItemProps) {
  const { selectedTask, setSelectedTask, setEditMode, getTaskById } = useTasks();

  const handleSelectTask = () => {
    const alreadySelected = selectedTask?.id === id;
    alreadySelected ? setSelectedTask(null) : getTaskById(id);
    setEditMode(false);
  };

  const disableTextSelection = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <ContentContainer>
      <span>{status}</span>

      <TaskTitle onClick={handleSelectTask} onMouseDown={disableTextSelection}>
        {title}
      </TaskTitle>

      <ButtonContainer>
        <CompleteTaskButton taskId={id} completed={status === "DONE"} />
      </ButtonContainer>

      <ButtonContainer>
        <DeleteTaskButton id={id} />
      </ButtonContainer>
    </ContentContainer>
  );
}
