const ser = require('../services/sellerService');

const getSeller = async (_req, res) => {
  const result = await ser.getSeller();   
  return res.status(200).json(result);
};

module.exports = {
  getSeller,
};
