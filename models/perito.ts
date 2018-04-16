const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { Sede } from './sede';

var Perito = new Schema({
    idPerito: number,
    usuario: string,
    senha: string,
    nome: string,
    sede: Sede,
    ativo: boolean
});
