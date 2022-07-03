import type { TaskListProps } from "./propTypes";

import { CompleteTaskButton } from "../../Buttons/CompleteTaskButton";
import { DeleteTaskButton } from "../../Buttons/DeleteTaskButton";
import { NewTaskButton } from "../../Buttons/NewTaskButton";

import {
  ContentContainer,
  FilterInput,
  FilterLabel,
  FilterSection,
  ListSection,
  NewButtonSection,
} from "./styles";
import { TaskItem } from "../../Items/TaskItem";

export function SideTasks({ tasks }: TaskListProps) {
  return (
    <>
      <ContentContainer>
        <FilterSection>
          <FilterLabel htmlFor="started">
            <FilterInput id="started" type="checkbox" />
            Started
          </FilterLabel>
          <FilterLabel htmlFor="completed">
            <FilterInput id="completed" type="checkbox" />
            Done
          </FilterLabel>
          <FilterLabel htmlFor="deleted">
            <FilterInput id="deleted" type="checkbox" />
            Deleted
          </FilterLabel>
        </FilterSection>

        <ListSection>
          <ul>
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
            <TaskItem />
          </ul>
        </ListSection>

        <NewButtonSection>
          <NewTaskButton title="Task 1" />
        </NewButtonSection>
      </ContentContainer>
    </>
  );
}
