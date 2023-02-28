const axios = require('axios');

const requestData = async (endpoint) => {
  const { data } = await axios.get(endpoint);
  return data;
};

module.exports = { requestData };
