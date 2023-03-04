const express = require('express');

const customerController = require('../controllers/customerController');
const orderController = require('../controllers/orderController');
const { validateToken } = require('../middlewares/validates');

const router = express.Router();

router.get('/products', validateToken, customerController.getProducts);

router.get('/orders/:id', orderController.getOrderById);

module.exports = router;
