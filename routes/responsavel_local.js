var Ocorrencia = require('../models/ocorrencia');
var Perito = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//responsavelLocalRouter
const express = require('express');
const responsavelLocalRouter = express.Router();

responsavelLocalRouter.use(checkToken);

//patch (atualiza dados de entrada no Responsável)
responsavelLocalRouter.patch('/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {                           
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            criadoPor: Perito.id
        }, {
            nomeResponsavel: req.body.nomeResponsavel,
            cargoResponsavel: req.body.cargoResponsavel,
            documentoResponsavel: req.body.documentoResponsavel,
            entrevistaResponsavel: req.body.entrevistaResponsavel
        }, 
        function(err, ocorrencia) {
            if (err) res.status(500).json(err);
            res.json('Dados salvos com sucesso.');
        });
    } else {
        res.json('Id da ocorrência inválido.')
    }
});

//router export
module.exports = responsavelLocalRouter;