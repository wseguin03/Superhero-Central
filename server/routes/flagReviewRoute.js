const express = require('express');
const { flagReview, getAllReviews } = require('../controllers/flagReviewController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:id').put(protect, flagReview);

router.route('/all').get(getAllReviews);

module.exports = router;