const ser = require('../services/loginService');

const login = async (req, res) => {
  const { email } = req.body;
  const result = await ser.serviceLogin(email);   
  return res.status(200).json(result);
};

module.exports = {
  login,
};
