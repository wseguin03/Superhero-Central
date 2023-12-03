const express = require('express');
const { registerUser, authUser, changePassword, getUsers, updateUser } = require('../controllers/userControllers');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
router.route('/login').post(authUser);
router.route('/change-password').put(protect, changePassword);
router.route('/:id').put(protect, updateUser);
module.exports = router;