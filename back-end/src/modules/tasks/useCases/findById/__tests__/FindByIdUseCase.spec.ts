import Sinon from 'sinon';
import { expect } from 'chai';

import type { TaskReturn } from '../../../../../@types/types';

import { TaskRepository } from '../../../repository';
import { FindByIdUseCase } from '../FindByIdUseCase';

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

const findByIdUseCase = new FindByIdUseCase(new TaskRepository());

describe('Test FindByIdUseCase', () => {
  let findByIdStub: Sinon.SinonStub;

  describe('Success case', () => {
    before(() => {
      findByIdStub = Sinon.stub(TaskRepository.prototype, 'findById');
      findByIdStub.resolves(MOCK_TASK);
    });

    after(() => {
      findByIdStub.restore();
    });

    it('should return a success response with founded task', async () => {
      const response = await findByIdUseCase.execute({ id: '1' }, 'Task 1');

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('payload');

      expect(response.statusCode).to.be.equal(200);
      expect(response.payload).to.be.an('object');

      expect(response.payload).to.have.property('id');
      expect(response.payload).to.have.property('title');
      expect(response.payload).to.have.property('description');
      expect(response.payload).to.have.property('status');
      expect(response.payload).to.have.property('mainTaskId');
      expect(response.payload).to.have.property('createdAt');
      expect(response.payload).to.have.property('lastUpdate');
      expect(response.payload).to.have.property('completedAt');
    });
  });

  describe('Fail case', () => {
    before(() => {
      findByIdStub = Sinon.stub(TaskRepository.prototype, 'findById');
      findByIdStub.resolves(null);
    });

    after(() => {
      findByIdStub.restore();
    });

    it('should throw an error with message and status code', async () => {
      try {
        await findByIdUseCase.execute({ id: '1' }, 'Task 10');
      } catch (error) {
        expect(error).to.be.an('object');
        expect(error).to.have.property('statusCode', 404);
        expect(error).to.have.property('message', 'Task not found');
      }
    });
  });
});
