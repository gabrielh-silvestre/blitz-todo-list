import { CompleteTaskButton } from "../../Buttons/CompleteTaskButton";
import { DeleteTaskButton } from "../../Buttons/DeleteTaskButton";

import { ButtonContainer, ContentContainer, TaskTitle } from "./styles";

export function TaskItem() {
  return (
    <ContentContainer>
      <span>Status</span>

      <TaskTitle>Título</TaskTitle>

      <ButtonContainer>
        <CompleteTaskButton />
      </ButtonContainer>

      <ButtonContainer>
        <DeleteTaskButton id="1" />
      </ButtonContainer>
    </ContentContainer>
  );
}
