import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newUser } from '../../utils/mocks';

describe('Test endpoint POST /users', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully create a new user', async () => {
    const response = await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.property('token');
    expect(typeof response.body.token).to.be.equal('string');

    expect(response.body).not.to.have.property('id');
    expect(response.body).not.to.have.property('email');
    expect(response.body).not.to.have.property('name');
    expect(response.body).not.to.have.property('password');
  });

  it('Fail to create a new user without email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        email: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Email is required');
  });

  it('Fail to create a new user with invalid email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        email: 'invalid_email',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Email is invalid');
  });

  it('Fail to create a new user without password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Password is required');
  });

  it('Fail to create a new user with short password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: 'short',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Password is too short');
  });

  it('Fail to create a new user with long password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: 'long_password'.repeat(16),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Password is too long');
  });

  it('Fail to create a new user without name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Name is required');
  });

  it('Fail to create a new user with short name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: 'sh',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Name is too short');
  });

  it('Fail to create a new user with long name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: 'long_name'.repeat(16),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Name is too long');
  });

  it('Fail to create a new user with duplicate email', async () => {
    await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    const response = await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Email already exists');
  });
});
