import Sinon from 'sinon';
import { expect } from 'chai';

import { UserValidator } from '../UserValidator';

import * as ExpressMocks from '../../../../__tests__/utils/mocks/middlewares.mock';
import { response, request, next } from '../../../../__tests__/utils/mocks';

describe('Test UserValidator, validateCreateUser handler', () => {
  let spiedStatus: Sinon.SinonSpy;
  let spiedJson: Sinon.SinonSpy;
  let spiedNext: Sinon.SinonSpy;

  before(() => {
    spiedStatus = Sinon.spy(response, 'status');
    spiedJson = Sinon.spy(response, 'json');
    spiedNext = Sinon.spy(ExpressMocks, 'next');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
    spiedNext.restore();
  });

  it('should throw an bad request error when req.body misses required fields', () => {
    request.body = { name: 'John Doe', password: '12345678' };

    try {
      UserValidator.validateCreateUser(request, response, next);
      expect.fail('should throw an error');
    } catch (error) {
      expect(error).to.have.property('statusCode', 400);
      expect(error).to.have.property('message', '"email" is required');
    }
  });

  it('should throw an unprocessable entity error when req.body come with wrong values', () => {
    request.body = { name: 'John Doe', email: 'email', password: '12345678' };

    try {
      UserValidator.validateCreateUser(request, response, next);
      expect.fail('should throw an error');
    } catch (error) {
      expect(error).to.have.property('statusCode', 422);
      expect(error).to.have.property(
        'message',
        '"email" must be a valid email'
      );
    }
  });

  it('should call next when req.body is valid', () => {
    request.body = {
      name: 'John Doe',
      email: 'email@email.com',
      password: '12345678',
    };

    UserValidator.validateCreateUser(request, response, next);
    expect(spiedNext.called).to.be.true;
  });
});

describe('Test UserValidator, validateLoginUser handler', () => {
  let spiedStatus: Sinon.SinonSpy;
  let spiedJson: Sinon.SinonSpy;
  let spiedNext: Sinon.SinonSpy;

  before(() => {
    spiedStatus = Sinon.spy(response, 'status');
    spiedJson = Sinon.spy(response, 'json');
    spiedNext = Sinon.spy(ExpressMocks, 'next');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
    spiedNext.restore();
  });

  it('should throw an bad request error when req.body misses required fields', () => {
    request.body = { email: 'john@email.com' };

    try {
      UserValidator.validateLoginUser(request, response, next);
      expect.fail('should throw an error');
    } catch (error) {
      expect(error).to.have.property('statusCode', 400);
      expect(error).to.have.property('message', '"password" is required');
    }
  });

  it('should call next when req.body is valid', () => {
    request.body = { email: 'email@email.com', password: '12345678' };

    UserValidator.validateLoginUser(request, response, next);
    expect(spiedNext.called).to.be.true;
  });
});
