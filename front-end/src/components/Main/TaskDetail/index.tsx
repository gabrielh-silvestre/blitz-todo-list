import { ToggleTaskEditButton } from "../../Buttons/ToggleTaskEditButton";
// import { NewTaskButton } from "../../Buttons/NewTaskButton";
import { TaskItem } from "../../Items/TaskItem";

import { taskStore } from "../../../stores/task";

import {
  ContentContainer,
  DescriptionSection,
  InfoContainer,
  // NewButtonSection,
  PrimarySection,
  SubTaskList,
  SubTasksSection,
  TaskDescription,
  TaskTitle,
} from "./styles";

export function TaskDetail() {
  const { selectedTask } = taskStore((state) => state);

  return (
    <>
      <ContentContainer>
        <PrimarySection>
          {/* <span>last update: </span> */}

          <InfoContainer>
            <TaskTitle>{selectedTask?.title}</TaskTitle>

            <div className="flex items-center">
              <span>{selectedTask?.status}</span>
              <ToggleTaskEditButton className="ml-8" />
            </div>
          </InfoContainer>
        </PrimarySection>

        <DescriptionSection>
          {selectedTask?.description && (
            <TaskDescription>{selectedTask?.description}</TaskDescription>
          )}
        </DescriptionSection>

        <SubTasksSection>
          <SubTaskList>
            {selectedTask?.subTasks?.map((subTask) => (
              <TaskItem key={subTask.id} {...subTask} />
            ))}
          </SubTaskList>

          {/* <NewButtonSection>
            <NewTaskButton />
          </NewButtonSection> */}
        </SubTasksSection>
      </ContentContainer>
    </>
  );
}
