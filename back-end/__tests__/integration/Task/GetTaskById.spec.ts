import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { FIRST_MAIN_TASK_ID, users } from '../../utils/mocks';

const [{ email, password }] = users;

describe('Test endpoint GET /tasks/:id', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully get task by id', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/${FIRST_MAIN_TASK_ID}`)
      .auth(email, password);

    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Object);
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

  it('Fail to get task by id without token', async () => {
    const response = await request(BASE_URL).get(
      `${ENDPOINTS.TASK}/${FIRST_MAIN_TASK_ID}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });

  it('Fail to get task by id with invalid token', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/${FIRST_MAIN_TASK_ID}`)
      .auth(email, 'invalid');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token');
  });

  it('Fail to get task by id with invalid id', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/2`)
      .auth(email, password);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Task not found');
  });
});
