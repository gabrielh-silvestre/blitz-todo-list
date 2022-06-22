import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newTask, tasks, users } from '../../utils/mocks';

const [{ email, password }] = users;
const [mainTask] = tasks;

describe('Test endpoint POST /tasks', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully create a new main task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('subTasks');

    expect(response.body).not.toHaveProperty('userId');

    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.title).toBe('string');
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.status).toBe('string');
    expect(typeof response.body.createdAt).toBe('string');
    expect(response.body.subTasks).toBeInstanceOf(Array);
  });

  it('Successfully create a new sub task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        mainTask: mainTask.id,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('subTasks');

    expect(response.body).not.toHaveProperty('userId');

    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.title).toBe('string');
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.status).toBe('string');
    expect(typeof response.body.createdAt).toBe('string');
    expect(response.body.subTasks).toBeInstanceOf(Array);
  });

  it('Fail to create a new task without title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Title is required');
  });

  it('Fail to create a new task with short title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: 'shor',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Title must be at least 5 characters');
  });

  it('Fail to create a new task with long title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: 'long_title'.repeat(12),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Title must be less than 12 characters');
  });

  it('Fail to create a new task with empty description', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        description: '',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Description must not be empty');
  });

  it('Fail to create a new task with long description', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        description: 'long_description'.repeat(80),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'Description must be less than 80 characters'
    );
  });

  it('Fail to create a new task with status', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        status: 'DONE',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('status should not be exists');
  });

  it('Fail to create a new task with duplicate title', async () => {
    await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Title already exists');
  });

  it('Fail to create a new sub task with invalid main task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        mainTask: 'invalid_id',
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Main task not found');
  });
});
