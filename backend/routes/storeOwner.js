const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { storeAverage, storeRatings } = require('../controllers/storeOwnerController');

router.use(authenticate, authorizeRoles('store_owner'));

router.get('/ratings/average', storeAverage);
router.get('/ratings', storeRatings);

module.exports = router;
