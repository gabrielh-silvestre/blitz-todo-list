import Sinon from "sinon";
import { expect } from "chai";

import { TaskRepository } from "../../../repository";
import { DeleteUseCase } from "../DeleteUseCase";

const DELETE_TASK_ID: string = "1";

const deleteUseCase = new DeleteUseCase(new TaskRepository());

describe("Test DeleteUseCase", () => {
  let findByIdStub: Sinon.SinonStub;
  let deleteStub: Sinon.SinonStub;

  describe("Success case", () => {
    before(() => {
      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(true);

      deleteStub = Sinon.stub(TaskRepository.prototype, "delete");
      deleteStub.resolves(null);
    });

    after(() => {
      findByIdStub.restore();
      deleteStub.restore();
    });

    it("should return a success response with deleted task", async () => {
      const response = await deleteUseCase.execute({ id: "1" }, DELETE_TASK_ID);

      expect(response).to.be.an("object");
      expect(response).to.have.property("statusCode");
      expect(response).to.have.property("payload");

      expect(response.statusCode).to.be.equal(204);
      expect(response.payload).to.be.null;
    });
  });

  describe("Fail case", () => {
    before(() => {
      findByIdStub = Sinon.stub(TaskRepository.prototype, "findById");
      findByIdStub.resolves(null);

      deleteStub = Sinon.stub(TaskRepository.prototype, "delete");
      deleteStub.resolves(new Error("Should not reach this point"));
    });

    after(() => {
      findByIdStub.restore();
      deleteStub.restore();
    });

    it("should throw an error with message and status code", async () => {
      try {
        await deleteUseCase.execute({ id: "1" }, DELETE_TASK_ID);
      } catch (error) {
        expect(error).to.be.an("object");
        expect(error).to.have.property("statusCode", 404);
        expect(error).to.have.property("message", "Task does not exist");
      }
    });
  });
});
