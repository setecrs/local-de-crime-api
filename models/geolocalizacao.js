const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Vestigio = require('./vestigio');

var GeolocalizacaoSchema = new Schema({
    vestigio: { type: Schema.ObjectId, ref: 'Vestigio', required: true },
    referencia: { type: String, default: '' },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
});

module.exports = mongoose.model('Geolocalizacao', GeolocalizacaoSchema);