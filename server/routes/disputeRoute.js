const express = require('express');
const router = express.Router();
const { createDispute, getDispute, updateDispute, deleteDispute } = require('../controllers/disputeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:reviewId', protect, createDispute);
router.get('/:reviewId', protect, getDispute);
router.put('/:reviewId', protect, updateDispute);
router.delete('/:reviewId', protect, deleteDispute);
module.exports = router;