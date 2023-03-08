const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { Product, Sale } = require('../database/models/index');
const { allProducts, orderWithProducts } = require('./mocks/product.mock');

chai.use(chaiHttp);

const { expect } = chai;

const customerProductsRoute = '/customer/products';

const customerOrdersRoute = '/customer/orders/1?displayProducts=true';

describe('Página de produtos', () => {

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
        .get(customerOrdersRoute);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(orderWithProducts);
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