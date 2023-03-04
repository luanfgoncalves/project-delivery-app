const express = require('express');
const { validateToken } = require('../middlewares/validates');

const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/', validateToken, orderController.order);

router.put('/update', orderController.updateOrderState);

module.exports = router;
