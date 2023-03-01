const jwt = require('jsonwebtoken');
const { User } = require('../../database/models/index');

const serviceLogin = async (email) => {
  const user = await User.findOne({ where: { email } });
  const secret = process.env.JWT_SECRET || 'secretJWT';
  const jwtConfig = {
   expiresIn: '7d',
   algorithm: 'HS256',
 };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  return { name: user.name, email: user.email, role: user.role, token };
  };

  module.exports = {
    serviceLogin,
  };