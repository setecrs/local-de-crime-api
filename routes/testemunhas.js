var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//enderecoRouter
const express = require('express');
const testemunhasRouter = express.Router();

testemunhasRouter.use(checkToken)

testemunhasRouter.patch('/:idOcorrencia', util.ObjectIdIsValid, function(req, res) {
    Ocorrencia.findOneAndUpdate( {
        _id: req.params.idOcorrencia,
        criadoPor: req.user.id
    }, {
        nomeTestemunha: req.body.nomeTestemunha,
        documentoTestemunha: req.body.documentoTestemunha,
        funcaoTestemunha: req.body.funcaoTestemunha,
        cargoTestemunha: req.body.cargoTestemunha,        
        entrevistaTestemunha: req.body.entrevistaTestemunha
    },
    function(err, ocorrencia) {
        if (err) res.json("Erro interno: " + err);
        
        console.log(req.user._id);
        res.json('Dados salvos com sucesso.');
    });
});

//router export
module.exports = testemunhasRouter;