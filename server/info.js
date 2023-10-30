const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    "id": Number,
    "name": String,
    "Gender": String,
    "Eye color": String, // Note: Use camelCase for field names
    "Race": String,
    "Hair color": String,
    "Height": Number,
    "Publisher": String,
    "Skin color": String,
    "Alignment": String,
    "Weight": Number
});


const info = mongoose.model('infos', infoSchema);
module.exports = (info)