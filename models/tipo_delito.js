const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoDelitoSchema = new Schema({
    tipoDelito: { type: String, required: true }
});

module.exports = mongoose.model('TipoDelito', TipoDelitoSchema);