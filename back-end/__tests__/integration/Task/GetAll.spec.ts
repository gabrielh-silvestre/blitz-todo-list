import request from "supertest";
import shelljs from "shelljs";

import { expect } from "chai";

import { app } from "../../../src/app";

import { DATABASE_RESET, ENDPOINTS } from "../../utils/constants";
import { users } from "../../utils/mocks";

const [{ email, password }] = users;

describe("Test endpoint GET /tasks", () => {
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

  it("Successfully get all tasks", async () => {
    const response = await request(app)
      .get(ENDPOINTS.TASK)
      .set("Authorization", token);

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("title");
    expect(response.body[0]).to.have.property("description");
    expect(response.body[0]).to.have.property("status");
    expect(response.body[0]).to.have.property("subTasks");
    expect(response.body[0]).to.have.property("createdAt");
    expect(response.body[0]).to.have.property("lastUpdate");
    expect(response.body[0]).to.have.property("completedAt");

    expect(response.body[0]).not.to.have.property("userId");

    expect(response.body[0].subTasks).to.be.an("array");
  });

  it("Fail to get all tasks without token", async () => {
    const response = await request(app).get(ENDPOINTS.TASK);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Unauthorized");
  });

  it("Fail to get all tasks with invalid token", async () => {
    const response = await request(app)
      .get(ENDPOINTS.TASK)
      .set("Authorization", "invalid token");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Expired or invalid token");
  });
});
