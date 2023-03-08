const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { Sale } = require('../database/models/index');
const { newOrder } = require('./mocks/order.mock');

chai.use(chaiHttp);

const { expect } = chai;

const sellerOrders = '/seller/orders?seller_id=2';

describe('Página da pessoa vendedora', () => {
  it('1 - Deve retornar todos os pedidos da pessoa vendedora com o id passado na query', async () => {
    sinon
      .stub(Sale, 'findAll')
      .resolves([newOrder]);
    
    const response = await chai
      .request(app)
      .get(sellerOrders);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([newOrder]);
  });
});