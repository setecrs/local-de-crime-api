const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MunicipioSchema = new Schema({
    nome: { type: String, required: true },
    estado: { type: Schema.ObjectId, ref: 'Estado', required: true }
});

module.exports = mongoose.model('Municipio', MunicipioSchema);