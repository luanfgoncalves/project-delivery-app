const ser = require('../services/loginService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // const { method } = req;
  // console.log(`metodo ${method}`);
  await ser.serviceRegister(name, email, password);
  return res.status(201).json({ message: 'Created' });
};

const getUsers = async (req, res, _next) => {
  const users = await ser.getUsers();
  return res.status(200).json(users);
};

const deleteUser = async (req, res, _next) => {
  const { id } = req.params;
  await ser.deleteUser(Number(id));
  return res.status(204).end();
};

module.exports = {
  register,
  getUsers,
  deleteUser,
};
