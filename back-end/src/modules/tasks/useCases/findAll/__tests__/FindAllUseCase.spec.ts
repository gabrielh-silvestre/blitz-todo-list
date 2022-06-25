import Sinon from 'sinon';
import { expect } from 'chai';

import type { TaskReturn } from '../../../../../@types/types';

import { TaskRepository } from '../../../repository';
import { FindAllUseCase } from '../FindAllUseCase';

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

const findAllUseCase = new FindAllUseCase(new TaskRepository());

describe('Test FindAllUseCase', () => {
  let findAllStub: Sinon.SinonStub;

  describe('Success case', () => {
    before(() => {
      findAllStub = Sinon.stub(TaskRepository.prototype, 'findAll');
      findAllStub.onFirstCall().resolves(MOCK_TASKS);
      findAllStub.onSecondCall().resolves([]);
    });

    after(() => {
      findAllStub.restore();
    });

    it('should return a success response with all tasks registered', async () => {
      const response = await findAllUseCase.execute({ id: '1' });

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('payload');

      expect(response.statusCode).to.be.equal(200);
      expect(response.payload).to.be.an('array');
      expect(response.payload[0]).to.be.an('object');

      expect(response.payload[0]).to.have.property('id');
      expect(response.payload[0]).to.have.property('title');
      expect(response.payload[0]).to.have.property('description');
      expect(response.payload[0]).to.have.property('status');
      expect(response.payload[0]).to.have.property('mainTaskId');
      expect(response.payload[0]).to.have.property('createdAt');
      expect(response.payload[0]).to.have.property('lastUpdate');
      expect(response.payload[0]).to.have.property('completedAt');
    });

    it('should return a success response with no tasks registered', async () => {
      const response = await findAllUseCase.execute({ id: '1' });

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('payload');

      expect(response.statusCode).to.be.equal(200);
      expect(response.payload).to.be.an('array');
      expect(response.payload).to.be.empty;
    });
  });
});
