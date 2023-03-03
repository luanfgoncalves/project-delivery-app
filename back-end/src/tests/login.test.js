const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { User } = require('../database/models/index');
const { validLogin, customerInfo, invalidEmailLogin } = require('./mocks');

chai.use(chaiHttp);

const { expect } = chai;

const loginRoute = ('/login');

describe('Página de login', () => {

  let response;

  afterEach(sinon.restore);

  it('1 - Deve logar a pessoa com dados válidos com sucesso', async () => {
    sinon
    .stub(User, 'findOne')
    .resolves({ dataValues: customerInfo, ...customerInfo });

    response = await chai
      .request(app)
      .post(loginRoute)
      .send(validLogin);

    expect(response.status).to.be.equal(200);
  });

  it('2 - Deve retornar erro se o email não existir no banco de dados', async () => {
    sinon.stub(User, 'findOne').resolves();

    response = await chai
      .request(app)
      .post(loginRoute)
      .send(invalidEmailLogin);

    expect(response.status).to.be.equal(404);
  });
});