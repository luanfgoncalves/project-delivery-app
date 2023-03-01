const ser = require('../../database/services/loginService');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  await ser.serviceRegister(name, email, password, role);   
  return res.status(201).json({ mensage: 'Created' });
};

module.exports = {
  register,
};
