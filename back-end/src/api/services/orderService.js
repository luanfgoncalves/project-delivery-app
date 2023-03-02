const { Sale } = require('../../database/models/index');

const postOrder = async (sale) => {
  const order = await Sale.create(sale);
  return order;
 };

module.exports = {
  postOrder,
};
