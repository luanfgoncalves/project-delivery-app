const express = require('express');
const cors = require('cors');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const customerRoute = require('./routes/customerRoute');
const sellerRoute = require('./routes/sellerRoute');
const adminRoute = require('./routes/adminRoute');
const orderRoute = require('./routes/orderRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static('public'));

app.use('/login', loginRoute);

app.use('/register', registerRoute);

app.use('/customer', customerRoute);

app.use('/seller', sellerRoute);

app.use('/order', orderRoute);

app.use('/admin', adminRoute);

app.use(errorHandler);

module.exports = app;
