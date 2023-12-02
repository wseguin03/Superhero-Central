const Review = require('../models/review');
const List = require('../models/lists');
const asyncHandler = require('express-async-handler');

const getReview = asyncHandler(
    async (req, res) => {
        const list = await List.findById(req.params.id);
        // console.log(list)
        if (list) {
            const review = await Review.find({ list_id: list._id });
            // console.log(review)
            res.json(review);
        } else {
            res.status(404);
            throw new Error('List not found');
        }
    }
);

const createReview = asyncHandler(
    async (req, res) => {
        if (!req.user) {
            res.status(401);
            throw new Error('Not authorized, no user logged in');
        }

        const { rating, comment } = req.body;
        const list = await List.findById(req.params.id);
        if (list) {
            const review = new Review({
                user: req.user.username,
                list_id: list._id,
                rating: Number(rating),
                comment,
            });
            const createdReview = await review.save();
            res.status(201).json(createdReview);
        } else {
            res.status(404);
            throw new Error('List not found');
        }
    }
);


module.exports = { getReview, createReview };