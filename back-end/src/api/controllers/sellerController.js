const ser = require('../../database/services/sellerService');

const getSellers = async (_req, res) => {
  const result = await ser.getSellers();   
  return res.status(200).json(result);
};

module.exports = {
  getSellers,
};
