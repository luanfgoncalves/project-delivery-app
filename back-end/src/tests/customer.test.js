const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const app = require('../api/app');
const { Product } = require('../database/models/index');
const { allProducts } = require('./mocks/product.mock');

chai.use(chaiHttp);

const { expect } = chai;

const customerProductsRoute = ('/customer/products');

describe('Página de produtos', () => {

  let response;

  afterEach(sinon.restore);

  it('1 - Deve retornar uma lista com todos os produtos disponíveis', async () => {
    const token = 'token';

    sinon
      .stub(Product, 'findAll')
      .resolves({ dataValues: allProducts, ...allProducts });

    sinon
      .stub(jwt, 'verify')
      .callsFake(() => token);
    
    response = await chai
      .request(app)
      .get(customerProductsRoute)
      .set('Authorization', token);
    
    expect(response.status).to.be.equal(200);
  });

  it('2 - Deve retornar um erro se a pessoa não estiver autenticada', async () => {
    response = await chai
      .request(app)
      .get(customerProductsRoute);

    expect(response.status).to.be.equal(401);
  });
});