const express = require('express');

const adminController = require('../controllers/adminController');
const { validateToken, validateRegister } = require('../middlewares/validates');

const router = express.Router();

router.post('/manage', validateToken, validateRegister, adminController.addNewUser);

module.exports = router;