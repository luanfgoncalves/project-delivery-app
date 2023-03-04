const express = require('express');

const sellerController = require('../controllers/sellerController');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', sellerController.getSeller);

router.get('/:id', orderController.getOrderById);

module.exports = router;
