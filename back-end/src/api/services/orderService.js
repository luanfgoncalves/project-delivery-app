const { Sale, SaleProduct, Product } = require('../../database/models/index');

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
const getOrderById = async (id, displayProducts) => {
  let order;

  if (displayProducts === 'true') {
    order = await Sale.findByPk(id, {
      include: 
        { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    });
  } else {
    order = await Sale.findByPk(id);
  }
  return order;
 };

//  deve receber sales.user_id
const getOrdersByUser = async (id) => {
  const order = await Sale.findAll({ where: { userId: id } });
  return order;
 };

// deve receber sales.seller_id
const getOrdersBySeller = async (id) => {
  const order = await Sale.findAll({ where: { sellerId: id } });
  return order;
 };

//  recebe o id da venda e o novo estado dela
 const updateOrderState = async (id, status) => {
  const sale = await Sale.findByPk(id);

  sale.status = status;
   
  const updatedSale = await sale.save();
  
  return updatedSale;
 };

module.exports = {
  postOrder,
  getOrderById,
  getOrdersByUser,
  getOrdersBySeller,
  updateOrderState,
};
