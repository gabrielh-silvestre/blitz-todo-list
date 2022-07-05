import { TaskItem } from "../../Items/TaskItem";
import { NewTaskButton } from "../../Buttons/NewTaskButton";

import { useGetAllTasks } from "../../../stores/task/useCases/GetAllTasks";

import {
  ContentContainer,
  FilterInput,
  FilterLabel,
  FilterSection,
  ListSection,
  NewButtonSection,
} from "./styles";

export function SideTasks() {
  const { data } = useGetAllTasks();

  return (
    <>
      <ContentContainer>
        {/* <FilterSection>
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
        </FilterSection> */}

        <ListSection>
          <ul>
            {data?.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </ul>
        </ListSection>

        <NewButtonSection>
          <NewTaskButton />
        </NewButtonSection>
      </ContentContainer>
    </>
  );
}
