import Sinon from 'sinon';
import { expect } from 'chai';

import type { SuccessCase, TaskCreateAttributes, TaskReturn } from '../../../../../@types/types';

import { TaskRepository } from '../../../repository';
import { CreateUseCase } from '../CreateUseCase';
import { CreateController } from '../CreateController';

import { response, request } from '../../../../../../__tests__/utils/mocks';

const createUseCase = new CreateUseCase(new TaskRepository());
const createController = new CreateController(createUseCase);

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

const SUCCESS_RESPONSE: SuccessCase<TaskReturn> = {
  statusCode: 201,
  payload: MOCK_NEW_TASK_RETURN,
};

describe.only('Test CreateController', () => {
  let useCaseStub: Sinon.SinonStub;
  let spiedStatus: Sinon.SinonSpy;
  let spiedJson: Sinon.SinonSpy;

  before(() => {
    spiedStatus = Sinon.spy(response, 'status');
    spiedJson = Sinon.spy(response, 'json');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
  });

  describe('Success case', () => {
    before(() => {
      useCaseStub = Sinon.stub(CreateUseCase.prototype, 'execute');
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.body = { userId: { id: '1' }, ...MOCK_NEW_TASK };
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return a success response', async () => {
      await createController.handle(request, response);

      expect(spiedStatus.calledWith(201)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.an('object');

      expect(spiedJson.args[0][0]).to.have.property('id');
      expect(spiedJson.args[0][0]).to.have.property('title');
      expect(spiedJson.args[0][0]).to.have.property('description');
      expect(spiedJson.args[0][0]).to.have.property('status');
      expect(spiedJson.args[0][0]).to.have.property('mainTaskId');
      expect(spiedJson.args[0][0]).to.have.property('createdAt');
      expect(spiedJson.args[0][0]).to.have.property('lastUpdate');
      expect(spiedJson.args[0][0]).to.have.property('completedAt');
    });
  });
});
