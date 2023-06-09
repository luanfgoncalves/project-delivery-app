const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { User } = require('../../database/models/index');
const jwtKey = require('../utils/jwtKey');

const serviceLogin = async (email) => {
  const user = await User.findOne({ where: { email } });

  const jwtConfig = {
   expiresIn: '7d',
   algorithm: 'HS256',
 };

  const token = jwt.sign({ data: { userId: user.id } }, jwtKey, jwtConfig);
  
  return { name: user.name, email: user.email, id: user.id, role: user.role, token };
};

const serviceRegister = async (name, email, password) => {
  const hasMD5 = md5(password);

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
 
  const token = jwt.sign({ data: { email } }, jwtKey, jwtConfig);

  const response = await User.create({ name, email, password: hasMD5, role: 'customer' });

  return { 
    id: response.id, name: response.name, email: response.email, role: response.role, token, 
  };
};

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

  module.exports = {
    serviceLogin,
    serviceRegister,
    getUsers,
    deleteUser,
  };