const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Perito = require('./user');
var TipoLocal = require('./tipo_local');
var Estado = require('./estado');
var Municipio = require('./municipio');
var Vestigio = require('./vestigio');

var OcorrenciaSchema = new Schema({
    
    criadoPor: { type: Schema.ObjectId, ref: 'User', required: true },

    // TELA DADOS GERAIS
    numeroOcorrencia: { type: String, default: '' },
    sede: { type: String, default: '' },    
    peritosAcionados: [{ type: Schema.ObjectId, ref: 'Perito' }],
    dataHoraAcionamento: { type: Date, default: Date.now },

    // TELA ENDEREÇO
    tipoLocal: { type: Schema.ObjectId, ref: 'TipoLocal', default: null },
    estado: { type: Schema.ObjectId, ref: 'Estado', default: null },
    municipio: { type: Schema.ObjectId, ref: 'Municipio', default: null },
    logradouro: { type: String, default: '' },
    numero: { type: Number },
    complemento: { type: String, default: '' },

    // TELA RESPONSÁVEL DO LOCAL
    nomeResponsavel: { type: String, default: '' },
    cargoResponsavel: { type: String, default: '' },
    documentoResponsavel: { type: String, default: '' },
    entrevistaResponsavel: { type: String, default: '' },

    // TELA SOBRE O LOCAL
    dataHoraChegada: { type: Date, default: null },
    condicaoLocal: { type: String, default: '' },
    InformacoesAdicionais: { type: String, default: '' },

    // TELA SOBRE O FATO
    dataOcorrencia: { type: Date, default: null },
    tipoDelito: { type: String, default: '' },
    modusOperandi: { type: String, default: '' },
    possiveisSuspeitos: { type: String, default: '' },
    valoresSubtraidos: { type: String, default: '' },

    // TELA VESTÍGIOS
    vestigios: [{ type: Schema.ObjectId, ref: 'Vestigio' }]
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);