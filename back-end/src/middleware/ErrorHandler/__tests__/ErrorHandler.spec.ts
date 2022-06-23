import { BadRequestError } from 'restify-errors';

import Sinon from 'sinon';
import { expect } from 'chai';

import { ErrorHandler } from '..';

import { response, request, next } from '../../../../__tests__/utils/mocks';

const EXPECTED_ERROR = new BadRequestError('Expected error');

const UNEXPECTED_ERROR = new Error('Unexpected error');

describe('Test ErrorHandler middleware', () => {
  let spiedStatus: Sinon.SinonSpy;
  let spiedJson: Sinon.SinonSpy;

  before(() => {
    response.status = () => response;

    spiedStatus = Sinon.spy(response, 'status');
    spiedJson = Sinon.spy(response, 'json');
  });

  after(() => {
    spiedStatus.restore();
    spiedJson.restore();
  });

  it('should treat expected error', async () => {
    ErrorHandler.handler(EXPECTED_ERROR, request, response, next);

    expect(spiedStatus.calledWith(400)).to.be.true;

    expect(spiedJson.args[0][0]).to.be.an('object');
    expect(spiedJson.args[0][0]).to.have.property('message');
    expect(spiedJson.args[0][0].message).to.be.a('string');
    expect(spiedJson.args[0][0].message).to.equal('Expected error');
  });

  it('should treat unexpected error', async () => {
    ErrorHandler.handler(UNEXPECTED_ERROR, request, response, next);

    expect(spiedStatus.calledWith(500)).to.be.true;

    expect(spiedJson.args[1][0]).to.be.an('object');
    expect(spiedJson.args[1][0]).to.have.property('message');
    expect(spiedJson.args[1][0].message).to.be.a('string');
    expect(spiedJson.args[1][0].message).to.equal('Internal Server Error');
  });
});
