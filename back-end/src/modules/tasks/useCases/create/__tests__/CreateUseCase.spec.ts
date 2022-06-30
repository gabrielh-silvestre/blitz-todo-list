import Sinon from "sinon";
import { expect } from "chai";

import type {
  TaskReturn,
  TaskCreateAttributes,
} from "../../../../../@types/types";

import { TaskRepository } from "../../../repository";
import { CreateUseCase } from "../CreateUseCase";

const MOCK_NEW_TASK: TaskCreateAttributes = {
  title: "Task 1",
  description: "Task 1 description",
  mainTaskId: "1",
};

const MOCK_NEW_TASK_RETURN: TaskReturn = {
  ...MOCK_NEW_TASK,
  id: "1",
  status: "DELETED",
  createdAt: new Date(),
  lastUpdate: new Date(),
  completedAt: new Date(),
};

const createUseCase = new CreateUseCase(new TaskRepository());

describe.only("Test CreateUseCase", () => {
  let findByTitleStub: Sinon.SinonStub;
  let findByIdStub: Sinon.SinonStub;
  let createStub: Sinon.SinonStub;

  describe("Success case", () => {
    before(() => {
      findByTitleStub = Sinon.stub(TaskRepository.prototype, "findByTitle");
      findByTitleStub.resolves(null);

      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(MOCK_NEW_TASK);

      createStub = Sinon.stub(TaskRepository.prototype, "create");
      createStub.resolves(MOCK_NEW_TASK_RETURN);
    });

    after(() => {
      findByTitleStub.restore();
      findByIdStub.restore();
      createStub.restore();
    });

    it("should return a success response with created task", async () => {
      const response = await createUseCase.execute({ id: "1" }, MOCK_NEW_TASK);

      expect(response).to.be.an("object");
      expect(response).to.have.property("statusCode");
      expect(response).to.have.property("payload");

      expect(response.statusCode).to.be.equal(201);
      expect(response.payload).to.be.an("object");

      expect(response.payload).to.have.property("id");
      expect(response.payload).to.have.property("title");
      expect(response.payload).to.have.property("description");
      expect(response.payload).to.have.property("status");
      expect(response.payload).to.have.property("mainTaskId");
      expect(response.payload).to.have.property("createdAt");
      expect(response.payload).to.have.property("lastUpdate");
      expect(response.payload).to.have.property("completedAt");
    });
  });

  describe("Fail case", () => {
    before(() => {
      findByTitleStub = Sinon.stub(TaskRepository.prototype, "findByTitle");
      findByTitleStub.onFirstCall().resolves(MOCK_NEW_TASK_RETURN);
      findByTitleStub.onSecondCall().resolves(null);

      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(null);

      createStub = Sinon.stub(TaskRepository.prototype, "create");
      createStub.rejects(new Error("Should not reach this point"));
    });

    after(() => {
      findByTitleStub.restore();
      findByIdStub.restore();
      createStub.restore();
    });

    it("when task title already exists, should throw an error with message and status code", async () => {
      try {
        await createUseCase.execute({ id: "1" }, MOCK_NEW_TASK);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 409);
        expect(error).to.have.property("message", "Task already exists");
      }
    });

    it("when task main task does not exist, should throw an error with message and status code", async () => {
      try {
        await createUseCase.execute({ id: "1" }, MOCK_NEW_TASK);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 404);
        expect(error).to.have.property("message", "Main task does not exist");
      }
    });
  });
});
