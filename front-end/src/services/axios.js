const axios = require('axios');

const localhost = 'http://localhost:3001';

const requestData = async (endpoint) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await axios.get(`${localhost}${endpoint}`, {
    headers: { Authorization: token },
  });

  return data;
};

module.exports = { requestData };
