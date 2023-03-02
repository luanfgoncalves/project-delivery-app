const ser = require('../services/loginService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // const { method } = req;
  // console.log(`metodo ${method}`);
  await ser.serviceRegister(name, email, password);
  return res.status(201).json({ message: 'Created' });
};

module.exports = {
  register,
};
