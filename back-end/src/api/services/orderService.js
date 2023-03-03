const { Sale } = require('../../database/models/index');

const postOrder = async (sale) => {
  const { dataValues } = await Sale.create(sale);
  console.log(dataValues);
  return dataValues;
 };

module.exports = {
  postOrder,
};
