import request from 'supertest';
import shelljs from 'shelljs';

const BASE_URL = 'http://localhost:3001/api/v1';
const ENDPOINT = '/users';

const DATABASE_RESET = 'npx prisma db seed';

const NEW_USER = {
  name: 'Test User',
  email: 'test@email.com',
  password: 'test_password',
};

describe('Test endpoint POST /user', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully create a new user', async () => {
    const response = await request(BASE_URL).post(ENDPOINT).send(NEW_USER);

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
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        email: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email is required');
  });

  it('Fail to create a new user with invalid email', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        email: 'invalid_email',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email is invalid');
  });

  it('Fail to create a new user without password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        password: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is required');
  });

  it('Fail to create a new user with short password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        password: 'short',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is too short');
  });

  it('Fail to create a new user with long password', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        password: 'long_password'.repeat(16),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Password is too long');
  });

  it('Fail to create a new user without name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        name: undefined,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is required');
  });

  it('Fail to create a new user with short name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        name: 'sh',
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is too short');
  });

  it('Fail to create a new user with long name', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINT)
      .send({
        ...NEW_USER,
        name: 'long_name'.repeat(16),
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Name is too long');
  });

  it('Fail to create a new user with duplicate email', async () => {
    await request(BASE_URL).post(ENDPOINT).send(NEW_USER);

    const response = await request(BASE_URL).post(ENDPOINT).send(NEW_USER);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Email already exists');
  });
});
