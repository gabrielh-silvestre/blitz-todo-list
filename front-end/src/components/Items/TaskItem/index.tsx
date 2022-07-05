import { CompleteTaskButton } from "../../Buttons/CompleteTaskButton";
import { DeleteTaskButton } from "../../Buttons/DeleteTaskButton";

import type { TaskItemProps } from "./propTypes";

import { useGetTaskById } from "../../../stores/task/useCases/GetTaskById";

import { ButtonContainer, ContentContainer, TaskTitle } from "./styles";

export function TaskItem({ id, status, title }: TaskItemProps) {
  const { mutate } = useGetTaskById(id);

  const handleSelectTask = () => {
    mutate(id);
  };

  return (
    <ContentContainer>
      <span>{status}</span>

      <TaskTitle onClick={handleSelectTask}>{title}</TaskTitle>

      <ButtonContainer>
        <CompleteTaskButton taskId={id} completed={status === "DONE"} />
      </ButtonContainer>

      <ButtonContainer>
        <DeleteTaskButton id={id} />
      </ButtonContainer>
    </ContentContainer>
  );
}
