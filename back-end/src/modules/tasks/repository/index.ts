import type { ITaskRepository } from "../../../@types/interfaces";
import type {
  TaskCreateAttributes,
  TaskReturn,
  TaskReturnOptions,
  TaskUpdateAttributes,
  UserIdentifier,
} from "../../../@types/types";
import { prisma } from "../../prisma";

class TaskRepository implements ITaskRepository {
  private static readonly taskOptions: TaskReturnOptions = {
    id: true,
    title: true,
    description: true,
    status: true,
    mainTaskId: false,
    createdAt: true,
    lastUpdate: true,
    completedAt: true,
  };

  async findAll({ id }: UserIdentifier): Promise<TaskReturn[]> {
    const tasks = await prisma.task.findMany({
      where: { userId: id, mainTaskId: null },
      select: {
        ...TaskRepository.taskOptions,
        subTasks: {
          select: {
            ...TaskRepository.taskOptions,
          },
        },
      },
    });

    return tasks;
  }

  async findById(
    { id: userId }: UserIdentifier,
    taskId: string
  ): Promise<TaskReturn | null> {
    const task = await prisma.task.findUnique({
      where: { id_userId: { id: taskId, userId } },
      select: {
        ...TaskRepository.taskOptions,
        subTasks: {
          select: {
            ...TaskRepository.taskOptions,
          },
        },
      },
    });

    return task;
  }

  async findByTitle(
    { id: userId }: UserIdentifier,
    title: string
  ): Promise<TaskReturn | null> {
    const task = await prisma.task.findUnique({
      where: { title_userId: { title, userId } },
      select: {
        ...TaskRepository.taskOptions,
        subTasks: {
          select: {
            ...TaskRepository.taskOptions,
          },
        },
      },
    });

    return task;
  }

  async findByMainTaskId(
    { id: userId }: UserIdentifier,
    mainTaskId: string
  ): Promise<TaskReturn[]> {
    const tasks = await prisma.task.findMany({
      where: { userId, mainTaskId },
      select: {
        ...TaskRepository.taskOptions,
        subTasks: {
          select: {
            ...TaskRepository.taskOptions,
          },
        },
      },
    });

    return tasks;
  }

  async create(
    { id: userId }: UserIdentifier,
    attributes: TaskCreateAttributes
  ): Promise<TaskReturn> {
    const task = await prisma.task.create({
      data: {
        ...attributes,
        userId,
      },
      select: { ...TaskRepository.taskOptions },
    });

    return task;
  }

  async update(
    { id: userId }: UserIdentifier,
    attributes: TaskUpdateAttributes
  ): Promise<TaskReturn> {
    const updatedTask = await prisma.task.update({
      where: { id_userId: { id: attributes.id, userId } },
      data: { ...attributes },
      select: { ...TaskRepository.taskOptions },
    });

    return updatedTask;
  }

  async delete({ id: userId }: UserIdentifier, taskId: string): Promise<void> {
    await prisma.task.delete({
      where: { id_userId: { id: taskId, userId } },
    });
  }
}

export { TaskRepository };
