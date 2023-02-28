const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/products', customerController.getProducts);

module.exports = router;