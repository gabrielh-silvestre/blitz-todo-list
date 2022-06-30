import Sinon from "sinon";
import { expect } from "chai";

import type {
  SuccessCase,
  TaskReturn,
  TaskUpdateAttributes,
} from "../../../../../@types/types";

import { TaskRepository } from "../../../repository";
import { UpdateUseCase } from "../UpdateUseCase";
import { UpdateController } from "../UpdateController";

import { response, request } from "../../../../../../__tests__/utils/mocks";

const updateUseCase = new UpdateUseCase(new TaskRepository());
const updateController = new UpdateController(updateUseCase);

const MOCK_ATT_TASK: TaskUpdateAttributes = {
  id: "1",
  title: "Task 1",
  description: "Task 1 description",
  mainTaskId: "1",
  status: "DONE",
};

const MOCK_ATT_TASK_RETURN: TaskReturn = {
  ...MOCK_ATT_TASK,
  status: "DELETED",
  createdAt: new Date(),
  lastUpdate: new Date(),
  completedAt: new Date(),
};

const SUCCESS_RESPONSE: SuccessCase<TaskReturn> = {
  statusCode: 200,
  payload: MOCK_ATT_TASK_RETURN,
};

describe("Test UpdateController", () => {
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
      useCaseStub = Sinon.stub(UpdateUseCase.prototype, "execute");
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.params.id = "1";
      request.body = { userId: { id: "1" }, ...MOCK_ATT_TASK };
    });

    after(() => {
      useCaseStub.restore();
    });

    it("should return a success response", async () => {
      await updateController.handle(request, response);

      expect(spiedStatus.calledWith(200)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.an("object");

      expect(spiedJson.args[0][0]).to.have.property("id");
      expect(spiedJson.args[0][0]).to.have.property("title");
      expect(spiedJson.args[0][0]).to.have.property("description");
      expect(spiedJson.args[0][0]).to.have.property("status");
      expect(spiedJson.args[0][0]).to.have.property("mainTaskId");
      expect(spiedJson.args[0][0]).to.have.property("createdAt");
      expect(spiedJson.args[0][0]).to.have.property("lastUpdate");
      expect(spiedJson.args[0][0]).to.have.property("completedAt");
    });
  });
});
