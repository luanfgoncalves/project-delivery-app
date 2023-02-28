const express = require('express');
const cors = require('cors');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
// requisito 4 login

app.use(express.json());

app.use('/login', loginRoute);

app.use(errorHandler);

module.exports = app;
