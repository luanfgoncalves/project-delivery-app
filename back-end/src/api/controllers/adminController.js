const ser = require('../services/adminService');

const addNewUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  await ser.addNewUser(name, email, password, role);

  return res.status(201).json({ message: 'Created' });
};

module.exports = {
  addNewUser,
};