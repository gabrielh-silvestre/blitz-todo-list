import { FIRST_USER_ID, SECOND_USER_ID, THIRD_USER_ID } from './users.mock';

export const FIRST_MAIN_TASK_ID = 'cl4q28wy400073a82ix9h5bmy';
export const SECOND_MAIN_TASK_ID = 'cl4q299ve00093a82o9pco4fy';

export const tasks = [
  {
    id: FIRST_MAIN_TASK_ID,
    title: 'Go to the store',
    description: null,
    userId: FIRST_USER_ID,
  },
  {
    title: 'Buy milk',
    description: 'Chocolate milk',
    userId: FIRST_USER_ID,
    mainTaskId: FIRST_MAIN_TASK_ID,
  },
  {
    title: 'Buy eggs',
    description: 'Eggs for breakfast',
    userId: FIRST_USER_ID,
    mainTaskId: FIRST_MAIN_TASK_ID,
  },
  {
    title: 'Buy bread',
    description: 'Integral bread',
    userId: FIRST_USER_ID,
    mainTaskId: FIRST_MAIN_TASK_ID,
  },
  {
    id: SECOND_MAIN_TASK_ID,
    title: 'Study',
    description: 'Learn Elixir',
    userId: SECOND_USER_ID,
  },
  {
    title: 'Read documentation',
    description: null,
    userId: SECOND_USER_ID,
    mainTaskId: SECOND_MAIN_TASK_ID,
  },
  {
    title: 'Practice in CodeWars',
    description: 'Solve 3 problems',
    userId: SECOND_USER_ID,
    mainTaskId: SECOND_MAIN_TASK_ID,
  },
  {
    title: 'Rest for the exam',
    description: null,
    userId: THIRD_USER_ID,
  },
];

export const newTask = {
  title: 'Test task',
  description: 'Test description',
};
