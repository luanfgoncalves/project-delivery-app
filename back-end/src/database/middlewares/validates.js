const md5 = require('md5');
const { User } = require('../models/index');


const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
    } 

  const userByEmail = await User.findOne({ where: { email } });
  if (!userByEmail || userByEmail.password !== md5(password)) {
  return res.status(404).json({ message: 'Not found' });
  }
  next();
}; 

module.exports = {
  validateLogin
};