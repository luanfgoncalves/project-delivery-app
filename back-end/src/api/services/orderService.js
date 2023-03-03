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
    saleOrder.map((product) => {
      return SaleProduct.create(product);
    }));
  
  return dataValues;
 };

module.exports = {
  postOrder,
};
