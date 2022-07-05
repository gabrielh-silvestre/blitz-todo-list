import { useEffect, useState } from "react";

import type { Task } from "../../../types";

import { NewTaskButton } from "../../Buttons/NewTaskButton";
import { TaskItem } from "../../Items/TaskItem";

import { useGetAllTasks } from "../../../stores/task/useCases/GetAllTasks";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data } = useGetAllTasks();

  useEffect(() => {
    if (data) {
      setSelectedTask(data[0]);
    }
  }, [data]);

  return (
    <>
      <ContentContainer>
        <PrimarySection>
          <span>last update: </span>

          <InfoContainer>
            <TaskTitle>{selectedTask?.title}</TaskTitle>
            <span>{selectedTask?.status}</span>
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

          <NewButtonSection>
            <NewTaskButton title="Task 1" />
          </NewButtonSection>
        </SubTasksSection>
      </ContentContainer>
    </>
  );
}
