const { Sale } = require('../../database/models/index');
const { SaleProduct } = require('../../database/models/index');

const postOrder = async (data, sales) => {
  const { dataValues } = await Sale.create(data);

  const saleOrder = sales.map((sale) => {
    const obj = {
      saleId: dataValues.id,
      productId: sale.id,
      quantity: sale.quantity,
    };
    return obj;
  });

  await Promise.all(
    saleOrder.map((product) => SaleProduct.create(product)),
  );
  
  return dataValues;
 };

//  deve receber sales.id
const getOrderById = async (id) => {
  const order = await Sale.findOne({ where: { id } });
  return order;
 };

//  deve receber sales.user_id
const getOrderByUser = async (id) => {
  const order = await Sale.findOne({ where: { user_id: id } });
  return order;
 };

// deve receber sales.seller_id
const getOrderBySeller = async (id) => {
  const order = await Sale.findOne({ where: { seller_id: id } });
  return order;
 };

//  recebe o id da venda e o novo estado dela
 const updateOrderState = async (id, status) => {
  const order = await Sale.findByPk({ id });
  await Sale.update(status);
  return order;
 };

module.exports = {
  postOrder,
  getOrderById,
  getOrderByUser,
  getOrderBySeller,
  updateOrderState,
};
