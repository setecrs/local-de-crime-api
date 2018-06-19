const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ModusOperandiSchema = new Schema({
    texto : { type: String, required: true },
    ativado : { type: Boolean, default: false }
});

module.exports = mongoose.model('ModusOperandi', ModusOperandiSchema);