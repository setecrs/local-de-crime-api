const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoLocalSchema = new Schema({
    nomeTipoLocal: { type: String, default: '' }
});

module.exports = mongoose.model('TipoLocal', TipoLocalSchema);