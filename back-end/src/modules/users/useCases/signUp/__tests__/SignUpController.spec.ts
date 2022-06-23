import Sinon from 'sinon';
import { expect } from 'chai';

import type {
  SignReturn,
  SuccessCase,
  UserCreateAttributes,
} from '../../../../../@types/types';

import { TokenService } from '../../../../../services/TokenService';
import { UserRepository } from '../../../repository';
import { SignUpUseCase } from '../SignUpUseCase';
import { SignUpController } from '../SignUpController';

import { response, request } from '../../../../../../__tests__/utils/mocks';

const signUpUseCase = new SignUpUseCase(new UserRepository(), TokenService);
const signUpController = new SignUpController(signUpUseCase);

const FAKE_TOKEN = '0n0v19nASV-V0n09Masvmz0-xasvzx';

const SUCCESS_RESPONSE: SuccessCase<SignReturn> = {
  statusCode: 201,
  payload: { token: `Bearer ${FAKE_TOKEN}` },
};

const CREATE_USER: UserCreateAttributes = {
  name: 'John Doe',
  email: 'john@email.com',
  password: '12345678',
};

describe('Test SignUpController', () => {
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
      useCaseStub = Sinon.stub(SignUpUseCase.prototype, 'execute');
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.body = CREATE_USER;
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return a success response', async () => {
      await signUpController.handle(request, response);

      expect(spiedStatus.calledWith(201)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.an('object');
      expect(spiedJson.args[0][0]).to.have.property('token');
      expect(spiedJson.args[0][0].token).to.be.an('string');
    });
  });
});
