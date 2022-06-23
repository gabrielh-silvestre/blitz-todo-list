import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newTask, tasks, users } from '../../utils/mocks';

const [{ email, password }] = users;
const [mainTask] = tasks;

describe('Test endpoint POST /tasks', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully create a new main task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    expect(response.status).to.be.equal(201);

    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('subTasks');

    expect(response.body).not.to.have.property('userId');

    expect(typeof response.body.id).to.be.equal('string');
    expect(typeof response.body.title).to.be.equal('string');
    expect(typeof response.body.description).to.be.equal('string');
    expect(typeof response.body.status).to.be.equal('string');
    expect(typeof response.body.createdAt).to.be.equal('string');
    expect(response.body.subTasks).to.be.an('array');
  });

  it('Successfully create a new sub task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        mainTask: mainTask.id,
      });

    expect(response.status).to.be.equal(201);

    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('subTasks');

    expect(response.body).not.to.have.property('userId');

    expect(typeof response.body.id).to.be.equal('string');
    expect(typeof response.body.title).to.be.equal('string');
    expect(typeof response.body.description).to.be.equal('string');
    expect(typeof response.body.status).to.be.equal('string');
    expect(typeof response.body.createdAt).to.be.equal('string');
    expect(response.body.subTasks).to.be.an('array');
  });

  it('Fail to create a new task without token', async () => {
    const response = await request(BASE_URL).post(ENDPOINTS.TASK).send(newTask);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Unauthorized');
  });

  it('Fail to create a new task with invalid token', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, 'invalid')
      .send(newTask);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Invalid token');
  });

  it('Fail to create a new task without title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Title is required');
  });

  it('Fail to create a new task with short title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: 'shor',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Title must be at least 5 characters');
  });

  it('Fail to create a new task with long title', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        title: 'long_title'.repeat(12),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Title must be less than 12 characters');
  });

  it('Fail to create a new task with empty description', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        description: '',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Description must not be empty');
  });

  it('Fail to create a new task with long description', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        description: 'long_description'.repeat(80),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      'Description must be less than 80 characters'
    );
  });

  it('Fail to create a new task with status', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        status: 'DONE',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('status should not be exists');
  });

  it('Fail to create a new task with duplicate title', async () => {
    await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Title already exists');
  });

  it('Fail to create a new sub task with invalid main task', async () => {
    const response = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send({
        ...newTask,
        mainTask: 'invalid_id',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Main task not found');
  });
});
