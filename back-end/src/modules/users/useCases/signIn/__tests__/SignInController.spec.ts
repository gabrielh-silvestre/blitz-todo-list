import Sinon from 'sinon';
import { expect } from 'chai';

import type {
  SignReturn,
  SuccessCase,
  UserAuthAttributes,
} from '../../../../../@types/types';

import { EncryptService } from '../../../../../services/EncryptService';
import { TokenService } from '../../../../../services/TokenService';

import { UserRepository } from '../../../repository';
import { SignInUseCase } from '../SignInUseCase';
import { SignInController } from '../SignInController';

import { response, request } from '../../../../../../__tests__/utils/mocks';

const signInUseCase = new SignInUseCase(
  new UserRepository(),
  TokenService,
  EncryptService
);
const signInController = new SignInController(signInUseCase);

const FAKE_TOKEN = '0n0v19nASV-V0n09Masvmz0-xasvzx';

const SUCCESS_RESPONSE: SuccessCase<SignReturn> = {
  statusCode: 200,
  payload: { token: `Bearer ${FAKE_TOKEN}` },
};

const LOGIN_USER: UserAuthAttributes = {
  email: 'john@email.com',
  password: '12345678',
};

describe('Test SignInController', () => {
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
      useCaseStub = Sinon.stub(SignInUseCase.prototype, 'execute');
      useCaseStub.resolves(SUCCESS_RESPONSE);

      request.body = LOGIN_USER;
    });

    after(() => {
      useCaseStub.restore();
    });

    it('should return a success response', async () => {
      await signInController.handle(request, response);

      expect(spiedStatus.calledWith(200)).to.be.true;

      expect(spiedJson.args[0][0]).to.be.an('object');
      expect(spiedJson.args[0][0]).to.have.property('token');
      expect(spiedJson.args[0][0].token).to.be.an('string');
    });
  });
});
