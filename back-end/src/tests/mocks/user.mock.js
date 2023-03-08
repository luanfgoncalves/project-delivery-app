const customerInfo = {
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  password: '1c37466c159755ce1fa181bd247cb925',
  role: 'customer',
};

const sellerInfo = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller'
};

const allUsers = [ customerInfo, sellerInfo ];

const validLogin = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

const invalidEmailLogin = {
  email: 'email@email.com',
  password: '$#zebirita#$',
};

const validRegisterInput = {
  ...validLogin,
  name: 'Cliente Zé Birita',
};

const validCustomerRegister = {
  ...validRegisterInput,
  role: 'customer'
};

module.exports = {
  customerInfo,
  sellerInfo,
  allUsers,
  validLogin,
  invalidEmailLogin,
  validRegisterInput,
  validCustomerRegister,
};