import { NewTaskButton } from "../../Buttons/NewTaskButton";
import { TaskItem } from "../../Items/TaskItem";

import {
  ContentContainer,
  DescriptionSection,
  InfoContainer,
  NewButtonSection,
  PrimarySection,
  SubTaskList,
  SubTasksSection,
  TaskDescription,
  TaskTitle,
} from "./styles";

export function TaskDetail() {
  return (
    <>
      <ContentContainer>
        <PrimarySection>
          <span>last update: 03/07/2022</span>

          <InfoContainer>
            <TaskTitle>Título</TaskTitle>
            <span>status</span>
          </InfoContainer>
        </PrimarySection>

        <DescriptionSection>
          <TaskDescription>{"Descrição ".repeat(80)}</TaskDescription>
        </DescriptionSection>

        <SubTasksSection>
          {/* Subtasks */}
          <SubTaskList>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </SubTaskList>

          <NewButtonSection>
            <NewTaskButton title="Task 1" />
          </NewButtonSection>
        </SubTasksSection>
      </ContentContainer>
    </>
  );
}
