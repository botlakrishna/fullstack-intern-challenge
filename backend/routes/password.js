const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { updatePassword } = require('../controllers/passwordController');

router.put('/', authenticate, updatePassword);

module.exports = router;
