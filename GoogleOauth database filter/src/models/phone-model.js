const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    googleID:String,
    phoneBrand:String,
    phoneSize:String,
    phoneType:String,
    phonePrice:String
});

const Phone = mongoose.model('phone',phoneSchema);

module.exports = Phone;