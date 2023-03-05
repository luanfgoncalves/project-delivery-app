const ser = require('../services/orderService');

const order = async (req, res) => {
  const { data, sales } = req.body;
  const result = await ser.postOrder(data, sales);   
  return res.status(201).json(result);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const { displayProducts } = req.query;

  const result = await ser.getOrderById(id, displayProducts);
  return res.status(200).json(result);
};

const getOrderByUser = async (req, res) => {
  const { user_id } = req.body;
  const result = await ser.getOrderByUser(user_id);   
  return res.status(200).json(result);
};

const getOrderBySeller = async (req, res) => {
  const { seller_id } = req.body;
  const result = await ser.getOrderBySeller(seller_id);   
  return res.status(200).json(result);
};

const updateOrderState = async (req, res) => {
  const { id, status } = req.body;
  const result = await ser.updateOrderState( id, status );
  return res.status(200).json(result);
 };

module.exports = {
  order,
  getOrderById,
  getOrderByUser,
  getOrderBySeller,
  updateOrderState,
};
