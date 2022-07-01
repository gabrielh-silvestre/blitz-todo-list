import request from "supertest";
import shelljs from "shelljs";

import { expect } from "chai";

import { app } from "../../../src/app";

import { DATABASE_RESET, ENDPOINTS } from "../../utils/constants";
import { newTask, tasks, users } from "../../utils/mocks";

const [{ email, password }] = users;
const [mainTask] = tasks;

describe("Test endpoint POST /tasks", () => {
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

  it("Successfully create a new main task", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send(newTask);

    expect(response.status).to.be.equal(201);

    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("description");
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("createdAt");

    expect(response.body).not.to.have.property("userId");

    expect(typeof response.body.id).to.be.equal("string");
    expect(typeof response.body.title).to.be.equal("string");
    expect(typeof response.body.description).to.be.equal("string");
    expect(typeof response.body.status).to.be.equal("string");
    expect(typeof response.body.createdAt).to.be.equal("string");
  });

  it("Successfully create a new sub task", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        mainTaskId: mainTask.id,
      });

    expect(response.status).to.be.equal(201);

    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("title");
    expect(response.body).to.have.property("description");
    expect(response.body).to.have.property("status");
    expect(response.body).to.have.property("createdAt");

    expect(response.body).not.to.have.property("userId");

    expect(typeof response.body.id).to.be.equal("string");
    expect(typeof response.body.title).to.be.equal("string");
    expect(typeof response.body.description).to.be.equal("string");
    expect(typeof response.body.status).to.be.equal("string");
    expect(typeof response.body.createdAt).to.be.equal("string");
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

  it("Fail to create a new task without title", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        title: undefined,
      });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"title" is required');
  });

  it("Fail to create a new task with short title", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        title: "shor",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"title" length must be at least 5 characters long'
    );
  });

  it("Fail to create a new task with long title", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        title: "long_title".repeat(12),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"title" length must be less than or equal to 12 characters long'
    );
  });

  it("Fail to create a new task with empty description", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        description: "",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"description" is not allowed to be empty'
    );
  });

  it("Fail to create a new task with long description", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        description: "long_description".repeat(80),
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      '"description" length must be less than or equal to 80 characters long'
    );
  });

  it("Fail to create a new task with status", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        status: "DONE",
      });

    expect(response.status).to.be.equal(422);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"status" is not allowed');
  });

  it("Fail to create a new task with duplicate title", async () => {
    await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send(newTask);

    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send(newTask);

    expect(response.status).to.be.equal(409);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Task already exists");
  });

  it("Fail to create a new sub task with invalid main task", async () => {
    const response = await request(app)
      .post(ENDPOINTS.TASK)
      .set("Authorization", token)
      .send({
        ...newTask,
        mainTaskId: "invalid_id",
      });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Main task does not exist");
  });
});
