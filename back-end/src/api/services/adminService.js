const md5 = require('md5');
const { User } = require('../../database/models/index');

const addNewUser = async (name, email, password, role) => {
  const hasMD5 = md5(password);

  await User.create({ name, email, password: hasMD5, role });
};

module.exports = {
  addNewUser,
};