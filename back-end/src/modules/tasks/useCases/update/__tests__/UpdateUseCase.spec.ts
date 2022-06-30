import Sinon from "sinon";
import { expect } from "chai";

import type {
  TaskReturn,
  TaskUpdateAttributes,
} from "../../../../../@types/types";

import { TaskRepository } from "../../../repository";
import { UpdateUseCase } from "../UpdateUseCase";

const MOCK_ATT_TASK: TaskUpdateAttributes = {
  id: "1",
  title: "Task 1",
  description: "Task 1 description",
  mainTaskId: null,
  status: "DONE",
};

const MOCK_ATT_TASK_RETURN: TaskReturn = {
  ...MOCK_ATT_TASK,
  status: "DELETED",
  createdAt: new Date(),
  lastUpdate: new Date(),
  completedAt: new Date(),
};

const updateUseCase = new UpdateUseCase(new TaskRepository());

describe("Test UpdateUseCase", () => {
  let findByTitleStub: Sinon.SinonStub;
  let findByIdStub: Sinon.SinonStub;
  let updateStub: Sinon.SinonStub;

  describe("Success case", () => {
    before(() => {
      findByTitleStub = Sinon.stub(TaskRepository.prototype, "findByTitle");
      findByTitleStub.resolves(MOCK_ATT_TASK_RETURN);

      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(MOCK_ATT_TASK_RETURN);

      updateStub = Sinon.stub(TaskRepository.prototype, "update");
      updateStub.resolves(MOCK_ATT_TASK_RETURN);
    });

    after(() => {
      findByTitleStub.restore();
      findByIdStub.restore();
      updateStub.restore();
    });

    it("should return a success response with created task", async () => {
      const response = await updateUseCase.execute({ id: "1" }, MOCK_ATT_TASK);

      expect(response).to.be.an("object");
      expect(response).to.have.property("statusCode");
      expect(response).to.have.property("payload");

      expect(response.statusCode).to.be.equal(200);
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
      findByTitleStub.resolves({ ...MOCK_ATT_TASK_RETURN, id: "2" });

      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(MOCK_ATT_TASK_RETURN);
      findByIdStub.onFirstCall().resolves(null);
      findByIdStub.onThirdCall().resolves(null);

      updateStub = Sinon.stub(TaskRepository.prototype, "update");
      updateStub.rejects(new Error("Should not reach this point"));
    });

    after(() => {
      findByTitleStub.restore();
      findByIdStub.restore();
      updateStub.restore();
    });

    it("when task does not exists, should throw an error with message and status code", async () => {
      try {
        await updateUseCase.execute({ id: "1" }, MOCK_ATT_TASK);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 404);
        expect(error).to.have.property("message", "Task not found");
      }
    });

    it("when main task does not exist, should throw an error with message and status code", async () => {
      try {
        await updateUseCase.execute({ id: "1" }, MOCK_ATT_TASK);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 404);
        expect(error).to.have.property("message", "Main task does not exist");
      }
    });

    it("when task title already exists, should throw an error with message and status code", async () => {
      try {
        await updateUseCase.execute({ id: "1" }, MOCK_ATT_TASK);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 409);
        expect(error).to.have.property("message", "Task already exists");
      }
    });
  });
});
