const express = require('express');
const { getReview, createReview } = require('../controllers/reviewController');
const protect = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router.route('/').get(getReview).post(protect, createReview);

module.exports = router;