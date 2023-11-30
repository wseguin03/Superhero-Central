const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    "rating": {type: Number, required: true},
    "comment": {type: String, required: false},
    "user": String,
    "ratingTime": { 
        type: Date, 
        default: () => {
            const now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            return new Date(now.getTime() - offset);
        }
    },    
    'flagged': {type: Boolean, default: false },
    "list_id": String
    

    
});


const reviews = mongoose.model('reviews', reviewSchema);
module.exports = (reviews)