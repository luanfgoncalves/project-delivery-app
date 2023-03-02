const express = require('express');

const adminController = require('../controllers/adminController');
const { validateToken } = require('../middlewares/validates');

const router = express.Router();

router.post('/manage', validateToken, adminController.addNewUser);

module.exports = router;