import Sinon from 'sinon';
import { expect } from 'chai';

import type { SuccessCase, TaskReturn } from '../../../../../@types/types';

import { TaskRepository } from '../../../repository';
import { FindByIdUseCase } from '../FindByIdUseCase';
import { FindByIdController } from '../FindByIdController';

import { response, request } from '../../../../../../__tests__/utils/mocks';

const findByIdUseCase = new FindByIdUseCase(new TaskRepository());
const findByIdController = new FindByIdController(findByIdUseCase);

const MOCK_TASK: TaskReturn = {
  id: '1',
  title: 'Task 1',
  description: 'Task 1 description',
  status: 'DELETED',
  mainTaskId: '1',
  createdAt: new Date(),
  lastUpdate: new Date(),
  completedAt: new Date(),
};

const SUCCESS_RESPONSE: SuccessCase<TaskReturn> = {
  statusCode: 200,
  payload: MOCK_TASK,
};

describe('Test FindByIdController', () => {
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
      useCaseStub = Sinon.stub(FindByIdUseCase.prototype, 'execute');
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.body = { userId: { id: '1' } };
      request.params = { title: 'Task 1' };
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return a success response', async () => {
      await findByIdController.handle(request, response);

      expect(spiedStatus.calledWith(200)).to.be.true;

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
