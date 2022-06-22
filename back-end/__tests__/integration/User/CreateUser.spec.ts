import request from 'supertest';
import shelljs from 'shelljs';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newUser } from '../../utils/mocks';

describe('Test endpoint POST /users', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully create a new user', async () => {
    const response = await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');

    expect(response.body).not.toHaveProperty('id');
    expect(response.body).not.toHaveProperty('email');
    expect(response.body).not.toHaveProperty('name');
    expect(response.body).not.toHaveProperty('password');
  });

  it('Fail to create a new user without email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        email: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email is required');
  });

  it('Fail to create a new user with invalid email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        email: 'invalid_email',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email is invalid');
  });

  it('Fail to create a new user without password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is required');
  });

  it('Fail to create a new user with short password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: 'short',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is too short');
  });

  it('Fail to create a new user with long password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        password: 'long_password'.repeat(16),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is too long');
  });

  it('Fail to create a new user without name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is required');
  });

  it('Fail to create a new user with short name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: 'sh',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is too short');
  });

  it('Fail to create a new user with long name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.USER)
      .send({
        ...newUser,
        name: 'long_name'.repeat(16),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is too long');
  });

  it('Fail to create a new user with duplicate email', async () => {
    await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    const response = await request(BASE_URL).post(ENDPOINTS.USER).send(newUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email already exists');
  });
});
