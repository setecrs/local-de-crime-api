const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoLocalSchema = new Schema({
    nomeTipoLocal: Number
});

module.exports = mongoose.model('TipoLocal', TipoLocalSchema);