const { validateToken } = require('../middlewares/validates');
const express = require('express');

const router = express.Router();

const orderController = require('../controllers/orderController');

router.post('/', validateToken, orderController.order);

module.exports = router;
