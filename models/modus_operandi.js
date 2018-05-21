const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ModusOperandiSchema = new Schema({
    modusOperandi: { type: String, required: true }
});

module.exports = mongoose.model('ModusOperandi', ModusOperandiSchema);