const ser = require('../services/loginService');

const login = async (req, res) => {
  const { password } = req.body
  const result = await ser.serviceLogin(password);   
  return res.status(200).json({ token: result });
};

module.exports = {
login
};