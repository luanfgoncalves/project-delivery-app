const express = require('express');

const router = express.Router();

const registerController = require('../controllers/registerController');
const { validateRegister } = require('../middlewares/validates');

router.post('/', validateRegister, registerController.login);

module.exports = router;
