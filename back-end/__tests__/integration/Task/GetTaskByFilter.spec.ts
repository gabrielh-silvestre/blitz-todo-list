import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { users, tasks } from '../../utils/mocks';

const [{ email, password }] = users;
const [{ title }] = tasks;

describe('Test endpoint GET /tasks/search?', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully get task by term', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/search?q=${title}`)
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

  it('Successfully get no tasks by term', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/search?q=invalid`)
      .auth(email, password);

    expect(response.status).toBe(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
  });

  it('Fail to get task by term without token', async () => {
    const response = await request(BASE_URL).get(
      `${ENDPOINTS.TASK}/search?q=${title}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
  });

  it('Fail to get task by term with invalid token', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/search?q=${title}`)
      .auth(email, 'invalid');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid token');
  });
});
