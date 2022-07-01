import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { app } from '../../../src/app';

import { DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { users } from '../../utils/mocks';

const [{ email, password }] = users;

describe('Test endpoint POST /login', () => {
  before(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully login', async () => {
    const response = await request(app)
      .post(ENDPOINTS.LOGIN)
      .send({ email, password });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.an('string');
  });

  it('Fail to login with invalid email', async () => {
    const response = await request(app).post(ENDPOINTS.LOGIN).send({
      email: 'invalid_email',
      password,
    });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid credentials');
  });

  it('Fail to login with invalid password', async () => {
    const response = await request(app).post(ENDPOINTS.LOGIN).send({
      email,
      password: 'invalid_password',
    });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid credentials');
  });
});
