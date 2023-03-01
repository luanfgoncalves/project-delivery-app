const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

const serviceLogin = async (email) => {
  const user = await User.findOne({ where: { email } });
  const secret = process.env.JWT_SECRET || 'secretJWT';
  const jwtConfig = {
   expiresIn: '7d',
   algorithm: 'HS256',
 };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  return { token, UserRole: user.role };
  };

  const serviceRegister = async (name, email, password, role) => {
    const hasMD5 = md5(password)
   await User.create({name, email, password: hasMD5, role })
 };

  module.exports = {
    serviceLogin,
    serviceRegister,
  };
  