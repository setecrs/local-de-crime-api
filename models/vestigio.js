const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Ocorrencia = require('./ocorrencia');
var TipoVestigio = require('./tipo_vestigio');

var VestigioSchema = new Schema({
    ocorrencia: { type: Schema.ObjectId, ref: 'Ocorrencia', required: true },
    tipo: { type: Schema.ObjectId, ref: 'TipoVestigio', required: true },
    coletado: { type: Boolean, default: false },
    etiqueta: { type: String, default: '' },
    nome: { type: String, default: '' },
    informacoesAdicionais: { type: String, default: '' }
});