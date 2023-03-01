const ser = require('../services/loginService');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  await ser.serviceRegister(name, email, password, role);   
  return res.status(201).json({ message: 'Created' });
};

module.exports = {
  register,
};
