const ser = require('../services/orderService');

const order = async (req, res) => {
  const sale = req.body;
  const result = await ser.postOrder(sale);   
  return res.status(200).json(result);
};

module.exports = {
  order,
};
