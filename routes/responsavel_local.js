var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//responsavelLocalRouter
const express = require('express');
const responsavelLocalRouter = express.Router();

responsavelLocalRouter.use(checkToken);

//patch (atualiza dados de entrada no Responsável)
responsavelLocalRouter.patch('/:idOcorrencia', util.ObjectIdIsValid, function(req, res) {
    Ocorrencia.findOneAndUpdate({
        _id: req.params.idOcorrencia,
        //criadoPor: req.user.id
    }, {
        nomeResponsavel: req.body.nomeResponsavel,
        cargoResponsavel: req.body.cargoResponsavel,
        documentoResponsavel: req.body.documentoResponsavel,
        entrevistaResponsavel: req.body.entrevistaResponsavel
    }, 
    function(err, ocorrencia) {
        if (err) res.json("Erro interno: " + err);
        
        console.log(req.user._id);
        res.json('Dados salvos com sucesso.');
    });
});

//router export
module.exports = responsavelLocalRouter;