import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { users } from '../../utils/mocks';

const [{ email, password }] = users;

describe('Test endpoint GET /tasks', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully get all tasks', async () => {
    const response = await request(BASE_URL)
      .get(ENDPOINTS.TASK)
      .auth(email, password);

    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('description');
    expect(response.body[0]).toHaveProperty('status');
    expect(response.body[0]).toHaveProperty('subTasks');
    expect(response.body[0]).toHaveProperty('createdAt');
    expect(response.body[0]).toHaveProperty('lastUpdate');
    expect(response.body[0]).toHaveProperty('completedAt');

    expect(response.body[0]).not.toHaveProperty('userId');

    expect(response.body[0].subTasks).toBeInstanceOf(Array);
  });

  it('Fail to get all tasks without token', async () => {
    const response = await request(BASE_URL).get(ENDPOINTS.TASK);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });

  it('Fail to get all tasks with invalid token', async () => {
    const response = await request(BASE_URL)
      .get(ENDPOINTS.TASK)
      .auth(email, 'invalid');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token');
  });
});
