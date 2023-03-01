const md5 = require('md5');
const { User } = require('../../database/models/index');

const validateLogin = async (req, res, next) => {
  console.log('fui chamado :3');
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

const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body; 

  const userByEmail = await User.findOne({ where: { email } });
  if (userByEmail) {
    if (userByEmail.name === name || userByEmail.email === email 
      || userByEmail.password === md5(password)) {
        return res.status(409).json({ message: 'Conflict' });
    }
  }
  next();
}; 

module.exports = {
  validateLogin,
  validateRegister,
};
