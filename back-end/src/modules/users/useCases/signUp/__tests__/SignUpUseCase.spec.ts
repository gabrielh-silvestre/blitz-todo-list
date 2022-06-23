import Sinon from 'sinon';
import { expect } from 'chai';

import type {
  UserAttributes,
  UserCreateAttributes,
} from '../../../../../@types/types';

import { EncryptService } from '../../../../../services/EncryptService';
import { TokenService } from '../../../../../services/TokenService';

import { UserRepository } from '../../../repository';
import { SignUpUseCase } from '../SignUpUseCase';

const signUpUseCase = new SignUpUseCase(
  new UserRepository(),
  TokenService,
  EncryptService
);

const FAKE_TOKEN = '0n0v19nASV-V0n09Masvmz0-xasvzx';

const CREATE_USER: UserCreateAttributes = {
  name: 'John Doe',
  email: 'john@email.com',
  password: '12345678',
};

const CREATED_USER: UserAttributes = {
  ...CREATE_USER,
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('Test SignUpUseCase', () => {
  let findByEmailStub: Sinon.SinonStub;
  let createStub: Sinon.SinonStub;
  let generateTokenStub: Sinon.SinonStub;
  let hashPasswordStub: Sinon.SinonStub;

  describe('Success case', () => {
    before(() => {
      findByEmailStub = Sinon.stub(UserRepository.prototype, 'findByEmail');
      findByEmailStub.resolves(null);

      createStub = Sinon.stub(UserRepository.prototype, 'create');
      createStub.resolves(CREATED_USER);

      generateTokenStub = Sinon.stub(TokenService, 'generateToken');
      generateTokenStub.returns(FAKE_TOKEN);

      hashPasswordStub = Sinon.stub(EncryptService, 'compare');
      hashPasswordStub.returns('12345678');
    });

    after(() => {
      findByEmailStub.restore();
      createStub.restore();
      generateTokenStub.restore();
      hashPasswordStub.restore();
    });

    it('should return a success response', async () => {
      const response = await signUpUseCase.execute(CREATE_USER);

      expect(response).to.be.an('object');
      expect(response).to.have.property('statusCode');
      expect(response).to.have.property('payload');

      expect(response.statusCode).to.be.equal(201);
      expect(response.payload).to.be.an('object');
      expect(response.payload).to.have.property('token');

      expect(response.payload.token).to.be.an('string');
      expect(response.payload.token).to.include('Bearer');
    });
  });

  describe('Error case', () => {
    before(() => {
      findByEmailStub = Sinon.stub(UserRepository.prototype, 'findByEmail');
      findByEmailStub.resolves(CREATED_USER);

      createStub = Sinon.stub(UserRepository.prototype, 'create');
      createStub.rejects(new Error('should not reach this point'));

      generateTokenStub = Sinon.stub(TokenService, 'generateToken');
      generateTokenStub.throws(new Error('should not reach this point'));

      hashPasswordStub = Sinon.stub(EncryptService, 'compare');
      hashPasswordStub.throws(new Error('should not reach this point'));
    });

    after(() => {
      findByEmailStub.restore();
      createStub.restore();
      generateTokenStub.restore();
      hashPasswordStub.restore();
    });

    it('should throw an error with status code and message', async () => {
      try {
        await signUpUseCase.execute(CREATE_USER);
        expect.fail('should throw an error');
      } catch (err) {
        expect(err).to.have.property('statusCode', 409);
        expect(err).to.have.property('message', 'Email already registered');
      }
    });
  });
});
