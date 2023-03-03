const customerInfo = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const validLogin = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const invalidEmailLogin = {
  email: 'email@email.com',
  password: '$#zebirita#$',
};

module.exports = {
  customerInfo,
  validLogin,
  invalidEmailLogin,
};