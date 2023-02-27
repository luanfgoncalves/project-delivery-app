const md5 = require('md5');
const { User } = require('../models/index');

const serviceLogin = async (password) => {
  
  const token = md5(password)
  return token;
  };

  module.exports = {
    serviceLogin
  };