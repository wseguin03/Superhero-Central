const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    "name": String,
    "list": Array
});


const hero_list = mongoose.model('hero_list', listSchema);
module.exports = (hero_list)