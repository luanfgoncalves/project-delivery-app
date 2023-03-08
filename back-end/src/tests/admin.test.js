const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { User } = require('../database/models/index');
const { validCustomerRegister } = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;

const adminRoute = ('/admin/manage');

describe('Página de cadastro', () => {

  let response;

  const token = 'token';

  it('1 - Deve cadastrar uma pessoa nova com sucesso', async () => {
    sinon
    .stub(jwt, 'verify')
    .callsFake(() => token);

    sinon
      .stub(User, 'findOne')
      .resolves();

    sinon
      .stub(User, 'create')
      .resolves(validCustomerRegister);

    response = await chai
      .request(app)
      .post(adminRoute)
      .send(validCustomerRegister)
      .set('Authorization', token);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal({ message: 'Created' });

    sinon.restore();
  });
});