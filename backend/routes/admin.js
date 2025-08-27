const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { addUser, listUsers, addStore, listStores, dashboardStats } = require('../controllers/adminController');

// Protect all routes: admin only
router.use(authenticate, authorizeRoles('admin'));

// Admin routes
router.post('/users', addUser);
router.get('/users', listUsers);
router.post('/stores', addStore);
router.get('/stores', listStores);
router.get('/stats', dashboardStats);

module.exports = router;
