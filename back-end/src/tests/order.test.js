const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { Sale, SaleProduct } = require('../database/models/index');
const { postOrder, newOrder, newSaleProduct } = require('./mocks/order.mock');

chai.use(chaiHttp);

const { expect } = chai;

const orderRoute = ('/orders');

describe('Rota de pedidos /orders', () => {

  let response;

  const token = 'token';

  beforeEach(() => {
    sinon
      .stub(jwt, 'verify')
      .callsFake(() => token);
  });

  afterEach(sinon.restore);

  it('1 - Deve poder criar um novo pedido com sucesso', async () => {
    sinon
      .stub(Sale, 'create')
      .resolves({ dataValues: newOrder, ...newOrder });

    sinon
      .stub(SaleProduct, 'create')
      .resolves({ dataValues: newSaleProduct, ...newSaleProduct })
    
    response = await chai
      .request(app)
      .post(orderRoute)
      .send(postOrder)
      .set('Authorization', token);
    
    expect(response.status).to.be.equal(201);
  });

  it('2 - Deve atualizar um pedido com sucesso', async () => {
    const updateRoute = `${orderRoute}/update`;

    sinon
      .stub(Sale, 'update')
      .resolves(1);

    sinon
      .stub(Sale, 'findByPk')
      .resolves(newOrder);

    response = await chai
      .request(app)
      .put(updateRoute)
      .send(newOrder)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(newOrder);
  });
});