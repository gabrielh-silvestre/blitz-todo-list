import request from "supertest";
import shelljs from "shelljs";

import { expect } from "chai";

import { app } from "../../../src/app";

import { DATABASE_RESET, ENDPOINTS } from "../../utils/constants";
import { tasks, users } from "../../utils/mocks";

const [{ email, password }] = users;
const [{ id }] = tasks;

describe("Test endpoint DELETE /tasks/:id", () => {
  beforeEach(() => {
    shelljs.exec(DATABASE_RESET, { silent: true });
  });

  it("Successfully delete a task", async () => {
    await request(app)
      .post(ENDPOINTS.LOGIN)
      .send({ email, password })
      .then(async (res) => {
        const { token } = res.body;

        const response = await request(app)
          .delete(`${ENDPOINTS.TASK}/${id}`)
          .set("Authorization", token);

        expect(response.status).to.be.equal(204);

        expect(response.body).to.be.empty;
      });
  });

  it("Fail to delete a task without token", async () => {
    const response = await request(app).delete(`${ENDPOINTS.TASK}/${id}`);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Unauthorized");
  });

  it("Fail to delete a task with invalid token", async () => {
    const response = await request(app)
      .delete(`${ENDPOINTS.TASK}/${id}`)
      .set("Authorization", "invalid token");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Expired or invalid token");
  });

  it("Fail to delete a task with invalid id", async () => {
    await request(app)
      .post(ENDPOINTS.LOGIN)
      .send({ email, password })
      .then(async (res) => {
        const { token } = res.body;
        const response = await request(app)
          .delete(`${ENDPOINTS.TASK}/invalid`)
          .set("Authorization", token);

        expect(response.status).to.be.equal(404);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.equal("Task does not exist");
      });
  });
});
