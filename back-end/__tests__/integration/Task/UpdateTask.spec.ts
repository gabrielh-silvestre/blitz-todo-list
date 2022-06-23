import request from 'supertest';
import shelljs from 'shelljs';

import { expect } from 'chai';

import { BASE_URL, DATABASE_RESET, ENDPOINTS } from '../../utils/constants';
import { newTask, tasks, users } from '../../utils/mocks';

const [{ email, password }] = users;
const [{ id }] = tasks;

const TASK_TO_UPDATE = {
  ...newTask,
  status: 'DONE',
  mainTask: id,
};

describe('Test endpoint PUT /task/:id', () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it('Successfully update a task', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('title');
    expect(response.body).to.have.property('description');
    expect(response.body).to.have.property('status');
    expect(response.body).to.have.property('subTasks');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('lastUpdate');
    expect(response.body).to.have.property('completedAt');

    expect(response.body).not.to.have.property('userId');

    expect(response.body.subTasks).to.be.an('array');;
  });

  it('Fail to update a task without title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"title" is required');
  });

  it('Fail to update a task with short title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: 'shor',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      '"title" length must be at least 5 characters long'
    );
  });

  it('Fail to update a task with long title', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        title: 'long_title'.repeat(12),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      '"title" length must be less than or equal to 12 characters long'
    );
  });

  it('Fail to update a task without description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"description" is required');
  });

  it('Fail to update a task with empty description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: '',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"description" should not be empty');
  });

  it('Fail to update a task with long description', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        description: 'long_description'.repeat(80),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      '"description" length must be less than or equal to 80 characters long'
    );
  });

  it('Fail to update a task without status', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        status: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('"status" is required');
  });

  it('Fail to update a task with invalid status', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        status: 'INVALID',
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      '"status" must be one of [TODO, IN_PROGRESS, DONE, COMPLETED]'
    );
  });

  it('Fail to update a task with invalid main task', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .auth(email, password)
      .send({
        ...TASK_TO_UPDATE,
        mainTask: 'INVALID',
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Main task not found');
  });

  it('Fail to update a task with duplicate title', async () => {
    const createdTask = await request(BASE_URL)
      .post(ENDPOINTS.TASK)
      .auth(email, password)
      .send(newTask);

    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/${createdTask.body.id}`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Task with this title already exists');
  });

  it('Fail to update a task with invalid id', async () => {
    const response = await request(BASE_URL)
      .put(`${ENDPOINTS.TASK}/INVALID`)
      .auth(email, password)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Task not found');
  });
});
