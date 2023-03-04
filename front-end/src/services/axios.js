const axios = require('axios');

const localhost = 'http://localhost:3001';

const requestData = async (endpoint) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await axios.get(`${localhost}${endpoint}`, {
    headers: { Authorization: token },
  });

  return data;
};
const postData = async (endpoint, dataObj) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await axios.post(`${localhost}${endpoint}`, dataObj, {
    headers: { Authorization: token },
  });

  return data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${localhost}/register`);
  return response;
};

const deleteData = async (id) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  const { data } = await axios.delete(`${localhost}/register/admin/${id}`, {
    headers: { Authorization: token },
  });
  return data;
};

module.exports = { requestData, postData, getAllUsers, deleteData };
