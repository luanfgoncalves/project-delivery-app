const express = require('express');
const { validateToken } = require('../middlewares/validates');

const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/', validateToken, orderController.order);

router.get('/id', orderController.getOrderById);

router.get('/user_id', orderController.getOrderByUser);

router.get('/seller_id', orderController.getOrderBySeller);

router.update('/update', orderController.updateOrderState);

module.exports = router;
