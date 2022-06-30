import Sinon from "sinon";
import { expect } from "chai";

import type { SuccessCase } from "../../../../../@types/types";

import { TaskRepository } from "../../../repository";
import { DeleteUseCase } from "../DeleteUseCase";
import { DeleteController } from "../DeleteController";

import { response, request } from "../../../../../../__tests__/utils/mocks";

const deleteUseCase = new DeleteUseCase(new TaskRepository());
const deleteController = new DeleteController(deleteUseCase);

const DELETE_TASK_ID: string = "1";

const SUCCESS_RESPONSE: SuccessCase<null> = {
  statusCode: 204,
  payload: null,
};

describe("Test DeleteController", () => {
  let useCaseStub: Sinon.SinonStub;
  let spiedStatus: Sinon.SinonSpy;
  let spiedJson: Sinon.SinonSpy;

  before(() => {
    spiedStatus = Sinon.spy(response, "status");
    spiedJson = Sinon.spy(response, "json");
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
  });

  describe("Success case", () => {
    before(() => {
      useCaseStub = Sinon.stub(DeleteUseCase.prototype, "execute");
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.params = { id: DELETE_TASK_ID };
      request.body = { userId: { id: "1" } };
    });

    after(() => {
      useCaseStub.restore();
    });

    it("should return a success response", async () => {
      await deleteController.handle(request, response);

      expect(spiedStatus.calledWith(204)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.null;
    });
  });
});
