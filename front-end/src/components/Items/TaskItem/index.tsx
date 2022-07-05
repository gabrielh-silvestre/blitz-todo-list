import { CompleteTaskButton } from "../../Buttons/CompleteTaskButton";
import { DeleteTaskButton } from "../../Buttons/DeleteTaskButton";

import type { TaskItemProps } from "./propTypes";

import { ButtonContainer, ContentContainer, TaskTitle } from "./styles";

export function TaskItem({ id, status, title }: TaskItemProps) {
  return (
    <ContentContainer>
      <span>{status}</span>

      <TaskTitle>{title}</TaskTitle>

      <ButtonContainer>
        <CompleteTaskButton />
      </ButtonContainer>

      <ButtonContainer>
        <DeleteTaskButton id={id} />
      </ButtonContainer>
    </ContentContainer>
  );
}
