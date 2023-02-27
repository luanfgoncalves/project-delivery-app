const express = require('express');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

const loginControll = require('../database/controllers/loginController')
const { validateLogin } = require('../database/middlewares/validates')
//requiosito 4 login
app.post('/login',validateLogin, loginControll.login)

module.exports = app;
