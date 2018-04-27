const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Municipio = require('./municipio')

var EstadoSchema = new Schema({
    nome: { type: String, default: '' },
    uf: { type: String, default: '' }
});

module.exports = mongoose.model('Estado', EstadoSchema);