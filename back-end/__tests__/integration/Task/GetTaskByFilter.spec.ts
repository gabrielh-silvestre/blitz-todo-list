import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

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

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('id');
    expect(response.body[0]).to.have.property('title');
    expect(response.body[0]).to.have.property('description');
    expect(response.body[0]).to.have.property('status');
    expect(response.body[0]).to.have.property('subTasks');
    expect(response.body[0]).to.have.property('createdAt');
    expect(response.body[0]).to.have.property('lastUpdate');
    expect(response.body[0]).to.have.property('completedAt');

    expect(response.body[0]).not.to.have.property('userId');

    expect(response.body[0].subTasks).to.be.an('array');
  });

  it('Successfully get no tasks by term', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/search?q=invalid`)
      .auth(email, password);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.length(0);
  });

  it('Fail to get task by term without token', async () => {
    const response = await request(BASE_URL).get(
      `${ENDPOINTS.TASK}/search?q=${title}`
    );

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Unauthorized');
  });

  it('Fail to get task by term with invalid token', async () => {
    const response = await request(BASE_URL)
      .get(`${ENDPOINTS.TASK}/search?q=${title}`)
      .auth(email, 'invalid');

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });
});
