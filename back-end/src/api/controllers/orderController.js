const ser = require('../services/orderService');

const order = async (req, res) => {
  const {data, sales} = req.body;
  const result = await ser.postOrder(data, sales);   
  return res.status(201).json(result);
};

module.exports = {
  order,
};
