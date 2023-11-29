const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    "name": {type: String, required: true, unique: true},
    "list": {type: Array, required: true},
    "user": String,
    "public": {type: Boolean, default: false},
    "description": String,
    'rating': { type: Number, default: 0 },
    'lastChanged': { type: Date, default: Date.now },
    'ratingCount': { type: Number, default: 0 },

    
});


const hero_list = mongoose.model('hero_list', listSchema);
module.exports = (hero_list)