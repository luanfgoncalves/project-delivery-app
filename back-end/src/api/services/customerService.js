const { Product } = require('../../database/models/index');

const getProducts = async () => {
  const products = await Product.findAll();
  return products;
 };

module.exports = {
  getProducts,
};