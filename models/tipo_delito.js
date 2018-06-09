const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoDelitoSchema = new Schema({
    tipoDelito: { type: String, default: '' }
});

module.exports = mongoose.model('TipoDelito', TipoDelitoSchema);