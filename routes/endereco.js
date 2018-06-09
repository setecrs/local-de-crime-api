var Ocorrencia = require('../models/ocorrencia');
var Policial = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//enderecoRouter
const express = require('express');
const enderecoRouter = express.Router();

enderecoRouter.use(checkToken);

//patch
// Salva as alterações da tela de endereço
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
enderecoRouter.patch('/:idOcorrencia', util.ObjectIdIsValid, function(req, res) {
    Ocorrencia.findOneAndUpdate({
        _id: req.params.idOcorrencia,
        criadoPor: req.user.id
    }, {
        tipoLocal: req.body.tipoLocal,
        estado: req.body.estado,
        municipio: req.body.municipio,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento
    }, 
    function(err, ocorrencia) {
        if (err) res.json("Erro interno: " + err);
        
        res.json('Dados salvos com sucesso.');
    })
});

//router export
module.exports = enderecoRouter;