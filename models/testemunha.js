const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Perito = require('./user');
//Requer a ocorrência!

var TestemunhaSchema = new Schema({
    entrevistadoPor: {type: Schema.ObjectId, ref: 'User', required: true},

    nomeTestemunha: {type: String, default: ""},
    documentoTestemunha: {type: String, default: ""},
    funcaoTestemunha: {type: String, default: ""},
    entrevistaTestemunha: {type: String, default: ""}
});

module.exports = mongoose.model('Testemunha', TestemunhaSchema);