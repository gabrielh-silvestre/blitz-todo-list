import Sinon from 'sinon';
import { expect } from 'chai';

import type { SuccessCase, TaskReturn } from '../../../../../@types/types';

import { TaskRepository } from '../../../repository';
import { FindAllUseCase } from '../FindAllUseCase';
import { FindAllController } from '../FindAllController';

import { response, request } from '../../../../../../__tests__/utils/mocks';

const findAllUseCase = new FindAllUseCase(new TaskRepository());
const findAllController = new FindAllController(findAllUseCase);

const MOCK_TASKS: TaskReturn[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Task 1 description',
    status: 'DELETED',
    mainTaskId: '1',
    createdAt: new Date(),
    lastUpdate: new Date(),
    completedAt: new Date(),
  },
  {
    id: '4',
    title: 'Task 2',
    description: 'Task 2 description',
    status: 'DONE',
    mainTaskId: null,
    createdAt: new Date(),
    lastUpdate: new Date(),
    completedAt: new Date(),
  },
];

const SUCCESS_RESPONSE: SuccessCase<TaskReturn[]> = {
  statusCode: 200,
  payload: MOCK_TASKS,
};

describe('Test FindAllController', () => {
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
      useCaseStub = Sinon.stub(FindAllUseCase.prototype, 'execute');
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.body = { userId: { id: '1' } };
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return a success response', async () => {
      await findAllController.handle(request, response);

      expect(spiedStatus.calledWith(200)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.an('array');
      expect(spiedJson.args[0][0][0]).to.be.an('object');

      expect(spiedJson.args[0][0][0]).to.have.property('id');
      expect(spiedJson.args[0][0][0]).to.have.property('title');
      expect(spiedJson.args[0][0][0]).to.have.property('description');
      expect(spiedJson.args[0][0][0]).to.have.property('status');
      expect(spiedJson.args[0][0][0]).to.have.property('mainTaskId');
      expect(spiedJson.args[0][0][0]).to.have.property('createdAt');
      expect(spiedJson.args[0][0][0]).to.have.property('lastUpdate');
      expect(spiedJson.args[0][0][0]).to.have.property('completedAt');
    });
  });
});
