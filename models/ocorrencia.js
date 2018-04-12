const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import { Perito } from './perito';
// import { Sede } from './sede';
// import { Local } from './local';
// import { Estado } from './estado';
// import { Municipio } from './municipio';
// import { Vestigio } from './vestigio';

var OcorrenciaSchema = new Schema({
    idOcorrencia: String,
    
    // TELA DADOS GERAIS
    numeroOcorrencia: String,
    // sedeOcorrencia: { type: Schema.ObjectId, ref: 'Sede' },
    sedeOcorrencia: String,    
    // peritoOcorrencia: { type: Schema.ObjectId, ref: 'Perito' },
    peritoOcorrencia: String,    
    dataAcionamento: { type: Date, default: Date.now }, //usar a classe Date do javascript
    horaAcionamento: { type: Date, default: Date.now }, //usar a classe Time do javascript

    // // TELA ENDEREÇO
    // local: Local,
    // estado: Estado,
    // municipio: Municipio;
    // logradouro: string;
    // complemento: string;

    // /*
    //  * TODO - revisar modelagem deste ponto em diante!
    //  */

    // // TELA RESPONSÁVEL DO LOCAL
    // nomeResponsavel: string;
    // cargoResponsavel: string;
    // documentoResponsavel: string;
    // entrevistaResponsavel: string;

    // // TELA SOBRE O LOCAL
    // dataHoraChegada: Date;
    // condicaoLocal: string;
    // InformacoesAdicionais: string;

    // // TELA SOBRE O FATO
    // dataOcorrencia: Date;
    // tipoDelito: string;
    // modusOperandi: string;
    // possiveisSuspeitos: string;
    // valoresSubtraidos: string;

    // // TELA VESTÍGIOS
    // vestigios: Vestigio[];
});

module.exports = mongoose.model('Ocorrencia', OcorrenciaSchema);