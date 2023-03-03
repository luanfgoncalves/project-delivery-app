const express = require('express');

const sellerController = require('../controllers/sellerController');

const router = express.Router();

router.get('/', sellerController.getSeller);

module.exports = router;
