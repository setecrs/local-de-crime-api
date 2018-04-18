const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Local = require('../models/local');

// import { Perito } from './perito';
// import { Sede } from './sede';
// import { Local } from './local';
// import { Estado } from './estado';
// import { Municipio } from './municipio';
// import { Vestigio } from './vestigio';

var OcorrenciaSchema = new Schema({
    
    // TELA DADOS GERAIS
    numeroOcorrencia: String,
    // sedeOcorrencia: { type: Schema.ObjectId, ref: 'Sede' },
    sedeOcorrencia: String,    
    // peritoOcorrencia: { type: Schema.ObjectId, ref: 'Perito' },
    peritoOcorrencia: String,    
    dataHoraAcionamento: { type: Date, default: Date.now }, //usar a classe Date do javascript

    // // TELA ENDEREÇO
    // local: Local,
    // estado: String,
    // municipio: String,
    // logradouro: String,
    // complemento: String,

    /*
     * TODO - revisar modelagem deste ponto em diante!
     */

    // TELA RESPONSÁVEL DO LOCAL
    nomeResponsavel: String,
    cargoResponsavel: String,
    documentoResponsavel: String,
    entrevistaResponsavel: String,

    // TELA SOBRE O LOCAL
    dataHoraChegada: Date,
    condicaoLocal: String,
    InformacoesAdicionais: String,

    // TELA SOBRE O FATO
    dataOcorrencia: Date,
    tipoDelito: String,
    modusOperandi: String,
    possiveisSuspeitos: String,
    valoresSubtraidos: String,

    // // TELA VESTÍGIOS
    // vestigios: [Vestigio]
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);