const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { Sale, User } = require('../database/models/index');
const { newOrder } = require('./mocks/order.mock');
const { sellerInfo } = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;

const sellerRoute = '/seller';

const sellerOrdersRoute = `${sellerRoute}/orders?seller_id=2`;

describe('Página da pessoa vendedora', () => {

  let response;

  afterEach(sinon.restore);

  it('1 - Deve retornar todos os pedidos da pessoa vendedora com o id passado na query', async () => {
    sinon
      .stub(Sale, 'findAll')
      .resolves([newOrder]);
    
    response = await chai
      .request(app)
      .get(sellerOrdersRoute);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([newOrder]);
  });

  it('2 - Deve retornar todas as pessoas vendedoras', async () => {
    sinon
      .stub(User, 'findAll')
      .resolves([sellerInfo]);

    response = await chai
      .request(app)
      .get(sellerRoute);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([sellerInfo]);
  });
});