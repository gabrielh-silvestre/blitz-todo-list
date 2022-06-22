import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newTask, tasks, users } from '../../utils/mocks';

const [{ email, password }] = users;
const [{ id }] = tasks;

const TASK_TO_UPDATE = {
  ...newTask,
  status: 'DONE',
  mainTask: id,
};

describe('Test endpoint PUT /task/:id', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully update a task', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('subTasks');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('lastUpdate');
    expect(response.body).toHaveProperty('completedAt');

    expect(response.body).not.toHaveProperty('userId');

    expect(response.body.subTasks).toBeInstanceOf(Array);
  });

  it('Fail to update a task without title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"title" is required');
  });

  it('Fail to update a task with short title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: 'shor',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      '"title" length must be at least 5 characters long'
    );
  });

  it('Fail to update a task with long title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: 'long_title'.repeat(12),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      '"title" length must be less than or equal to 12 characters long'
    );
  });

  it('Fail to update a task without description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"description" is required');
  });

  it('Fail to update a task with empty description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: '',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"description" should not be empty');
  });

  it('Fail to update a task with long description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: 'long_description'.repeat(80),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      '"description" length must be less than or equal to 80 characters long'
    );
  });

  it('Fail to update a task without status', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        status: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('"status" is required');
  });

  it('Fail to update a task with invalid status', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        status: 'INVALID',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      '"status" must be one of [TODO, IN_PROGRESS, DONE, COMPLETED]'
    );
  });

  it('Fail to update a task with invalid main task', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        mainTask: 'INVALID',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Main task not found');
  });

  it('Fail to update a task with duplicate title', async () => {
    const createdTask = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${createdTask.body.id}`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Task with this title already exists');
  });

  it('Fail to update a task with invalid id', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/INVALID`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Task not found');
  });
});
