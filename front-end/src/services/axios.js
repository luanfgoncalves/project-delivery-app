const axios = require('axios');

const localhost = 'http://localhost:3001';

const requestData = async (endpoint) => {
  const { data } = await axios.get(`${localhost}${endpoint}`);
  return data;
};

module.exports = { requestData };
