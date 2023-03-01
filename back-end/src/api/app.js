const express = require('express');
const cors = require('cors');
require('express-async-errors');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/login', loginRoute);
app.post('/register', registerRoute);

app.use(errorHandler);

module.exports = app;
