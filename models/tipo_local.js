const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoLocalSchema = new Schema({
    tipoLocal: { type: String, required: true }
});

module.exports = mongoose.model('TipoLocal', TipoLocalSchema);