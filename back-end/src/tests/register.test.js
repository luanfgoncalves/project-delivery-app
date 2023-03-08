const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { User } = require('../database/models/index');
const { customerInfo, validRegisterInput, allUsers } = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;

const registerRoute = ('/register');

describe('Página de cadastro', () => {

  let response;

  const token = 'token';

  afterEach(sinon.restore);

  it('1 - Deve cadastrar uma pessoa nova com sucesso', async () => {
    sinon
      .stub(User, 'findOne')
      .resolves();

    sinon
      .stub(User, 'create')
      .resolves(validRegisterInput);

    response = await chai
      .request(app)
      .post(registerRoute)
      .send(validRegisterInput);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal({ message: 'Created' });
  });

  it('2 - Deve retornar um erro se o email já existir no banco de dados', async () => {
    sinon
      .stub(User, 'findOne')
      .resolves({ dataValues: customerInfo, ...customerInfo });

    response = await chai
      .request(app)
      .post(registerRoute)
      .send(validRegisterInput);

    expect(response.status).to.be.equal(409);
  });

  it('3 - Deve retornar todos os usuários cadastrados', async () => {
    sinon
      .stub(User, 'findAll')
      .resolves(allUsers);

    response = await chai
      .request(app)
      .get(registerRoute);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allUsers);
  });

  it('4 - Deve deletar um usuário específico', async () => {
    const deleteCustomerRoute = `${registerRoute}/admin/3`;

    sinon
      .stub(jwt, 'verify')
      .callsFake(() => token);

    sinon
      .stub(User, 'destroy')
      .resolves();
    
    response = await chai
      .request(app)
      .delete(deleteCustomerRoute)
      .set('Authorization', token);

    expect(response.status).to.be.equal(204);
  });
});