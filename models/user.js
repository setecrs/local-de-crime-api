// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    usuario: String,
    senha: String,
    nome: { type: String, default: '' },
    sede: { type: String, default: '' },
    ativo: Boolean
});

// metodos ======================
// gera a hash
userSchema.methods.generateHash = function (senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

// verifica se a senha esta correta
userSchema.methods.validPassword = function (senha) {
    return bcrypt.compareSync(senha, this.senha);
};

// cria o model para peritos e o expoe para o app
module.exports = mongoose.model('Perito', userSchema);