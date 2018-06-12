const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VestigioSchema = new Schema({
    tipo: { type: Schema.ObjectId, ref: 'TipoVestigio', required: true },
    outroTipoVestigio: { type: String },
    coletado: { type: Boolean, default: false },
    etiqueta: { type: String, default: '' },
    informacoesAdicionais: { type: String, default: '' }
});

module.exports = mongoose.model('Vestigio', VestigioSchema);