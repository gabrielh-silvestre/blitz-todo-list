import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

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

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('subTasks');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('lastUpdate');
    expect(response.body).to.have.property('completedAt');

    expect(response.body).not.to.have.property('userId');

    expect(response.body.subTasks).to.be.an('array');
  });

  it('Fail to get task by id without token', async () => {
    const response = await request(BASE_URL).get(
      `${ENDPOINTS.TASK}/${FIRST_MAIN_TASK_ID}`
    );

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Unauthorized');
  });

  it('Fail to get task by id with invalid token', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/${FIRST_MAIN_TASK_ID}`)
      .auth(email, 'invalid');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });

  it('Fail to get task by id with invalid id', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/2`)
      .auth(email, password);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Task not found');
  });
});
