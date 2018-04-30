const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var SedeSchema = new Schema({
    nome: { type: String, default: '' }
});

module.exports = mongoose.model('Sede', SedeSchema);