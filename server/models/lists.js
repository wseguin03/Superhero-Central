const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    "name": {type: String, required: true, unique: true},
    "list": {type: Array, required: true},
    "user": String,
    "public": {type: Boolean, default: false},
    "description": String,
    'averageRating': Number,
    'lastChanged': { 
        type: Date,
        default: () => {
            let now = new Date();
            const offset = now.getTimezoneOffset() * 60000;
            return new Date(now.getTime() - offset);
        }
    },    

    
});


listSchema.pre('save', function (next) {
    let now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    this.lastChanged = new Date(now.getTime() - offset);
    next();
});

const hero_list = mongoose.model('hero_list', listSchema);
module.exports = (hero_list)