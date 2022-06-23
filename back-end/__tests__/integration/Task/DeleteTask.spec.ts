import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { tasks, users } from '../../utils/mocks';

const [{ email, password }] = users;
const [{ id }] = tasks;

describe('Test endpoint DELETE /tasks/:id', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully delete a task', async () => {
    const response = await request(BASE_URL)
      .delete(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.undefined;
  });

  it('Fail to delete a task without token', async () => {
    const response = await request(BASE_URL).delete(`${ENDPOINTS.TASK}/${id}`);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Unauthorized');
  });

  it('Fail to delete a task with invalid token', async () => {
    const response = await request(BASE_URL)
      .delete(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, 'invalid');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });

  it('Fail to delete a task with invalid id', async () => {
    const response = await request(BASE_URL)
      .delete(`${ENDPOINTS.TASK}/invalid`)
      .auth(email, password);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Task not found');
  });
});
