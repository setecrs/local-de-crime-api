const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TipoVestigioSchema = new Schema({
    tipoVestigio: { type: String, required: true },
    nomeVestigio: { type: String, required: true }
});

module.exports = mongoose.model('TipoVestigio', TipoVestigioSchema);