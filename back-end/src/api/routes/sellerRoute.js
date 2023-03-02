const express = require('express');

const sellersController = require('../controllers/sellerController');

const router = express.Router();

router.get('/', sellersController.getSellers);

module.exports = router;
