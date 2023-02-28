const ser = require('../services/customerService');

const getProducts = async (_req, res) => {
  const result = await ser.getProducts();   
  return res.status(200).json(result);
};

module.exports = {
  getProducts,
};