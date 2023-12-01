const express = require('express');
const { registerUser, authUser, changePassword } = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/change-password').put(protect, changePassword);

module.exports = router;