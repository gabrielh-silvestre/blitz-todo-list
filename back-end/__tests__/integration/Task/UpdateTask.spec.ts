import request from "supertest";
import shelljs from "shelljs";

import { expect } from "chai";

import { app } from "../../../src/app";

import { DATABASE_RESET, ENDPOINTS } from "../../utils/constants";
import { newTask, tasks, users } from "../../utils/mocks";

const [{ email, password }] = users;
const [{ id }] = tasks;

const TASK_TO_UPDATE = {
  ...newTask,
  status: "DONE",
  mainTaskId: id,
};

describe("Test endpoint PUT /task/:id", () => {
  let token: string;

  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  before(async () => {
    await request(app)
      .post(ENDPOINTS.LOGIN)
      .send({ email, password })
      .expect(200)
      .then((res) => {
        token = res.body.token;
      });
  });

  it("Successfully update a task", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("description");
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("createdAt");
    expect(response.body).to.have.property("lastUpdate");
    expect(response.body).to.have.property("completedAt");

    expect(response.body).not.to.have.property("userId");
  });

  it("Fail to create a new task without token", async () => {
    const response = await request(app).post(ENDPOINTS.TASK).send(newTask);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Unauthorized");
  });

  it("Fail to create a new task with invalid token", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", "invalid token")
      .send(newTask);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Expired or invalid token");
  });

  it("Fail to update a task without title", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        title: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"title" is required');
  });

  it("Fail to update a task with short title", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        title: "shor",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"title" length must be at least 5 characters long'
    );
  });

  it("Fail to update a task with long title", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        title: "long_title".repeat(12),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"title" length must be less than or equal to 12 characters long'
    );
  });

  it("Fail to update a task without description", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        description: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"description" is required');
  });

  it("Fail to update a task with empty description", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        description: "",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"description" is not allowed to be empty'
    );
  });

  it("Fail to update a task with long description", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        description: "long_description".repeat(80),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"description" length must be less than or equal to 80 characters long'
    );
  });

  it("Fail to update a task without status", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        status: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"status" is required');
  });

  it("Fail to update a task with invalid status", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        status: "INVALID",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"status" must be one of [CREATED, IN_PROGRESS, DONE, DELETED]'
    );
  });

  it("Fail to update a task with invalid main task", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send({
        ...TASK_TO_UPDATE,
        mainTaskId: "INVALID",
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Main task does not exist");
  });

  it("Fail to update a task with duplicate title", async () => {
    await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send(newTask);

    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", token)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Task already exists");
  });

  it("Fail to update a task with invalid id", async () => {
    const response = await request(app)
      .put(`${ENDPOINTS.TASK}/INVALID`)
      .set("Authorization", token)
      .send(TASK_TO_UPDATE);

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Task not found");
  });
});
