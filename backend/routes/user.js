const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { listStores, rateStore } = require('../controllers/userController');

router.use(authenticate, authorizeRoles('user'));

router.get('/stores', listStores);
router.post('/ratings', rateStore);

module.exports = router;
