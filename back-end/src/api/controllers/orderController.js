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

const getOrdersByUser = async (req, res) => {
  const { user_id } = req.query;
  const result = await ser.getOrdersByUser(user_id);   
  return res.status(200).json(result);
};

const getOrdersBySeller = async (req, res) => {
  const { seller_id } = req.query;
  const result = await ser.getOrdersBySeller(seller_id);
  return res.status(200).json(result);
};

const updateOrderState = async (req, res) => {
  const { id, status } = req.body;
  const result = await ser.updateOrderState(id, status);
  return res.status(200).json(result);
 };

module.exports = {
  order,
  getOrderById,
  getOrdersByUser,
  getOrdersBySeller,
  updateOrderState,
};
