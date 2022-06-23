import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newUser } from '../../utils/mocks';

describe('Test endpoint POST /login', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully login', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.LOGIN)
      .send(newUser);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.an('string');
  });

  it('Fail to login with invalid email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.LOGIN)
      .send({
        ...newUser,
        email: 'invalid_email',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid credentials');
  });

  it('Fail to login with invalid password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.LOGIN)
      .send({
        ...newUser,
        password: 'invalid_password',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid credentials');
  });
});
