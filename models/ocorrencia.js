const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Local = require('../models/local');
var User = require('./user');

// import { Perito } from './perito';
// import { Sede } from './sede';
// import { Local } from './local';
// import { Estado } from './estado';
// import { Municipio } from './municipio';
// import { Vestigio } from './vestigio';

var OcorrenciaSchema = new Schema({
    criadoPor: { type: Schema.ObjectId, ref: 'User' },
    
        // TELA DADOS GERAIS
        numeroOcorrencia: { type: String, default: '' },
        // sedeOcorrencia: { type: Schema.ObjectId, ref: 'Sede' },
        sedeOcorrencia: { type: String, default: '' },    
        peritoOcorrencia: [{ type: Schema.ObjectId, ref: 'Perito' }],
        dataHoraAcionamento: { type: Date, default: Date.now },

    // TELA ENDEREÇO
    local: String,
    //local: {type: Schema.ObjectId, ref: Local},
    estado: String,
    //estado: {type: Schema.ObjectId, ref: Estado},
    municipio: String,
    //municipio: {type: Schema.ObjectId, ref: Municipio},
    logradouro: String,
    complemento: String,

    /*
     * TODO - revisar modelagem deste ponto em diante!
     */

    // TELA RESPONSÁVEL DO LOCAL
    nomeResponsavel: { type: String, default: '' },
    cargoResponsavel: { type: String, default: '' },
    documentoResponsavel: { type: String, default: '' },
    entrevistaResponsavel: { type: String, default: '' },

    // TELA SOBRE O LOCAL
    dataHoraChegada: { type: Date, default: Date.now },
    condicaoLocal: { type: String, default: '' },
    InformacoesAdicionais: { type: String, default: '' },

    // TELA SOBRE O FATO
    dataOcorrencia: { type: Date, default: Date.now },
    tipoDelito: { type: String, default: '' },
    modusOperandi: { type: String, default: '' },
    possiveisSuspeitos: { type: String, default: '' },
    valoresSubtraidos: { type: String, default: '' },

    // // TELA VESTÍGIOS
    // vestigios: [Vestigio]
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);