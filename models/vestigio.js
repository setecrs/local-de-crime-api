const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Ocorrencia = require('./ocorrencia');

var VestigioSchema = new Schema({
    ocorrencia: { type: Schema.ObjectId, ref: 'Ocorrencia', required: true },
    coletado: { type: Boolean, default: false },
    etiqueta: { type: String, default: '' },
    nome: { type: String, default: '' },
    tipo: { type: String, default: '' },
    informacoesAdicionais: { type: String, default: '' },
    geoInfo: { type: Schema.ObjectId, ref: 'Ocorrencia', default: null },
});