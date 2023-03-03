const express = require('express');

const customerController = require('../controllers/customerController');
const { validateToken } = require('../middlewares/validates');

const router = express.Router();

router.get('/products', validateToken, customerController.getProducts);

module.exports = router;
