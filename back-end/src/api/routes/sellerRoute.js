const express = require('express');

const sellerController = require('../controllers/sellerController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', sellerController.getSeller);

router.get('/orders/:id', orderController.getOrderById);

router.get('/orders', orderController.getOrdersBySeller);

module.exports = router;
