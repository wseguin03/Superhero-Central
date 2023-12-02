const asyncHandler = require('express-async-handler');
const Review = require('../models/review');

const flagReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    console.log(review)
    if (review) {
        review.flagged = !review.flagged;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({});
    res.json(reviews);
});
module.exports = { flagReview, getAllReviews };