import { useForm, SubmitHandler } from "react-hook-form";

import type { UpdateTaskDto } from "../../../types";
import type { FormInput } from "./propTypes";

import { ToggleTaskEditButton } from "../../Buttons/ToggleTaskEditButton";
import { NewTaskButton } from "../../Buttons/NewTaskButton";

import { taskStore } from "../../../stores/task";
import { useCreateNewTask } from "../../../stores/task/useCases/CreateNewTask";
import { useUpdateTask } from "../../../stores/task/useCases/UpdateTask";

import {
  FormContainer,
  DescriptionSection,
  InfoContainer,
  TaskTitleInput,
  NewButtonSection,
  PrimarySection,
  TaskDescriptionInput,
  InputWarning,
} from "./styles";

export function NewTaskForm() {
  const { selectedTask } = taskStore((state) => state);
  const { mutate: mutateUpdate } = useUpdateTask();
  const { mutate: mutateCreate } = useCreateNewTask();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: {
      title: selectedTask?.title,
      description: selectedTask?.description,
      status: selectedTask?.status || null,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault();

    console.log({ data, selectedTask });

    if (selectedTask) {
      const taskToUpdate = data as UpdateTaskDto;
      const { description } = taskToUpdate;

      mutateUpdate({
        taskId: selectedTask.id,
        task: {
          ...taskToUpdate,
          description: description === "" ? null : description,
        },
      });
    } else {
      const { title, description } = data;

      mutateCreate({
        title,
        description: description === "" ? null : description,
      });
    }
  };

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <PrimarySection>
          <span>last update: </span>

          <InfoContainer>
            <div className="flex flex-col">
              <TaskTitleInput
                type="text"
                placeholder="Task title..."
                {...register("title", {
                  required: { value: true, message: "Title is required" },
                  minLength: { value: 5, message: "Title is too short!" },
                  maxLength: { value: 12, message: "Title is too long!" },
                })}
              />
              {errors.title && (
                <InputWarning>{errors.title.message}</InputWarning>
              )}
            </div>

            <div className="flex items-center">
              {selectedTask && (
                <select {...register("status", { required: true })}>
                  <option value="">Select a status</option>
                  <option value="CREATED">Created</option>
                  <option value="IN_PROGRESS">In progress</option>
                  <option value="DONE">Done</option>
                </select>
              )}

              <ToggleTaskEditButton isEditing className="ml-8" />
            </div>
          </InfoContainer>
        </PrimarySection>

        <DescriptionSection>
          <TaskDescriptionInput
            placeholder="Task description..."
            {...register("description", {
              required: false,
              maxLength: { value: 80, message: "Description is too long!" },
            })}
          />
          {errors.description && (
            <InputWarning>{errors.description.message}</InputWarning>
          )}
        </DescriptionSection>

        <NewButtonSection>
          <NewTaskButton disabled={!isValid} isUpdate />
        </NewButtonSection>
      </FormContainer>
    </>
  );
}
