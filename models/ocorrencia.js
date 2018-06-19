const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OcorrenciaSchema = new Schema({
    
    criadoPor: { type: Schema.ObjectId, ref: 'user', required: true },
    ocorrenciaEncerrada:{ type: Boolean, default: false, required: true },   

    // TELA DADOS GERAIS
    numeroOcorrencia: { type: String, default: '' },
    //sede: { type: Schema.ObjectId, ref: 'Sede', default: null }, //passado de Objeto para String
    sede: { type: String, default: '' },
    policiaisAcionados: [{ type: Schema.ObjectId, ref: 'user' }],
    dataHoraAcionamento: { type: Date, default: Date.now },

    // TELA ENDEREÇO
    tipoLocal: { type: Schema.ObjectId, ref: 'TipoLocal', default: null },
    outroTipoLocal: { type: String },
    //estado: { type: Schema.ObjectId, ref: 'Estado', default: null }, //passado de Objeto para String
    estado: { type: String, default: '' },
    //municipio: { type: Schema.ObjectId, ref: 'Municipio', default: null }, //passado de Objeto para String
    municipio: { type: String, default: '' },
    logradouro: { type: String, default: '' },
    numero: { type: String, default: '' },
    complemento: { type: String, default: '' },

    // TELA RESPONSÁVEL DO LOCAL
    nomeResponsavel: { type: String, default: '' },
    cargoResponsavel: { type: String, default: '' },
    documentoResponsavel: { type: String, default: '' },
    entrevistaResponsavel: { type: String, default: '' },

    //TELA SOBRE TESTEMUNHAS
    nomeTestemunha: { type: String, default: '' },
    funcaoTestemunha: { type: String, default: '' },
    documentoTestemunha: { type: String, default: '' },
    entrevistaTestemunha: { type: String, default: '' },

    // TELA SOBRE O LOCAL
    dataHoraChegada: { type: Date, default: null },
    condicaoLocal: { type: String, default: '' },
    informacoesAdicionais: { type: String, default: '' },

    // TELA SOBRE O FATO
    dataOcorrencia: { type: Date, default: null },
    tipoDelito: { type: Schema.ObjectId, ref: 'TipoDelito', default: null },
    outroTipoDelito: { type: String },
    modusOperandi: [],
    outroModusOperandi: { type: String },
    possiveisSuspeitos: { type: String, default: '' },
    valoresSubtraidos: { type: String, default: '' },

    // TELA VESTÍGIOS
    vestigios: [{ type: Schema.ObjectId, ref: 'Vestigio' }]
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);