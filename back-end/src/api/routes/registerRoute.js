const express = require('express');

const router = express.Router();

const registerController = require('../controllers/registerController');
const { validateRegister, validateToken } = require('../middlewares/validates');

router.post('/', validateRegister, registerController.register);
router.get('/', registerController.getUsers);
router.delete('/admin/:id', validateToken, registerController.deleteUser);

module.exports = router;
