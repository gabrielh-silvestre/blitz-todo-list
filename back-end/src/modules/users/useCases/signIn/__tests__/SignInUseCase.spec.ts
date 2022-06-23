import Sinon from 'sinon';
import { expect } from 'chai';

import type {
  UserAttributes,
  UserAuthAttributes,
} from '../../../../../@types/types';

import { EncryptService } from '../../../../../services/EncryptService';
import { TokenService } from '../../../../../services/TokenService';

import { UserRepository } from '../../../repository';
import { SignInUseCase } from '../SignInUseCase';

const signInUseCase = new SignInUseCase(
  new UserRepository(),
  TokenService,
  EncryptService
);

const FAKE_TOKEN = '0n0v19nASV-V0n09Masvmz0-xasvzx';

const LOGIN_USER: UserAuthAttributes = {
  email: 'john@email.com',
  password: '12345678',
};

const FOUNDED_USER: UserAttributes = {
  ...LOGIN_USER,
  id: '1',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Test SignInUseCase', () => {
  let findByEmailStub: Sinon.SinonStub;
  let generateTokenStub: Sinon.SinonStub;
  let compareHashStub: Sinon.SinonStub;

  describe('Success case', () => {
    before(() => {
      findByEmailStub = Sinon.stub(UserRepository.prototype, 'findByEmail');
      findByEmailStub.resolves(FOUNDED_USER);

      generateTokenStub = Sinon.stub(TokenService, 'generateToken');
      generateTokenStub.returns(FAKE_TOKEN);

      compareHashStub = Sinon.stub(EncryptService, 'compare');
      compareHashStub.returns(true);
    });

    after(() => {
      findByEmailStub.restore();
      generateTokenStub.restore();
      compareHashStub.restore();
    });

    it('should return a success response', async () => {
      const response = await signInUseCase.execute(LOGIN_USER);

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('payload');

      expect(response.statusCode).to.be.equal(200);
      expect(response.payload).to.be.an('object');
      expect(response.payload).to.have.property('token');

      expect(response.payload.token).to.be.an('string');
      expect(response.payload.token).to.include('Bearer');
    });
  });

  describe('Error case', () => {
    before(() => {
      findByEmailStub = Sinon.stub(UserRepository.prototype, 'findByEmail');
      findByEmailStub.onFirstCall().resolves(null);
      findByEmailStub.onSecondCall().resolves(LOGIN_USER);

      generateTokenStub = Sinon.stub(TokenService, 'generateToken');
      generateTokenStub.throws(new Error('should not reach this point'));

      compareHashStub = Sinon.stub(EncryptService, 'compare');
      compareHashStub.returns(false);
    });

    after(() => {
      findByEmailStub.restore();
      generateTokenStub.restore();
      compareHashStub.restore();
    });

    it('when email is not registered, should throw an error with status code and message', async () => {
      try {
        await signInUseCase.execute(LOGIN_USER);
        expect.fail('should throw an error');
      } catch (err) {
        expect(err).to.have.property('statusCode', 404);
        expect(err).to.have.property('message', 'Invalid credentials');
      }
    });

    it('when password is wrong, should throw an error with status code and message', async () => {
      try {
        await signInUseCase.execute({ ...LOGIN_USER, password: 'wrong' });
        expect.fail('should throw an error');
      } catch (err) {
        expect(err).to.have.property('statusCode', 404);
        expect(err).to.have.property('message', 'Invalid credentials');
      }
    });
  });
});
