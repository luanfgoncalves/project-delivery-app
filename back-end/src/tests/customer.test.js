const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { Product, Sale } = require('../database/models/index');
const { allProducts, orderWithProducts } = require('./mocks/product.mock');
const { newOrder } = require('./mocks/order.mock');

chai.use(chaiHttp);

const { expect } = chai;

const customerProductsRoute = '/customer/products';

const customerOrderProductRoute = '/customer/orders/1?displayProducts=true';

const customerOrdersRoute = '/customer/orders?user_id=3';

describe('Página da pessoa cliente', () => {

  let response;

  const token = 'token';

  afterEach(sinon.restore);

  describe('Com pessoa autenticada', () => {

    beforeEach(() => {
      sinon
        .stub(jwt, 'verify')
        .callsFake(() => token);
    });

    it('1 - Deve retornar uma lista com todos os produtos disponíveis', async () => {
      sinon
        .stub(Product, 'findAll')
        .resolves({ dataValues: allProducts, ...allProducts });
      
      response = await chai
        .request(app)
        .get(customerProductsRoute)
        .set('Authorization', token);
      
      expect(response.status).to.be.equal(200);
    });

    it('2 - Deve retornar os dados completos do pedido com os produtos', async () => {
      sinon
        .stub(Sale, 'findByPk')
        .resolves(orderWithProducts);

      response = await chai
        .request(app)
        .get(customerOrderProductRoute);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(orderWithProducts);
    });

    it('3 - Deve retornar todos os pedidos da pessoa cliente com o id passado na query', async () => {
      sinon
        .stub(Sale, 'findAll')
        .resolves([newOrder]);
      
      response = await chai
        .request(app)
        .get(customerOrdersRoute);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal([newOrder]);
    });
  });

  describe('Sem pessoa autenticada', () => {

    it('1 - Deve retornar um erro', async () => {
      response = await chai
      .request(app)
      .get(customerProductsRoute);
      
      expect(response.status).to.be.equal(401);
    });
  });
});