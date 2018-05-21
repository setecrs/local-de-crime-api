var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//responsavelLocalRouter
const express = require('express');
const responsavelLocalRouter = express.Router();

responsavelLocalRouter.use(checkToken);

//get e post não necessários pois são partes da Ocorrência.

//patch (atualiza dados de entrada no Responsável)
//parâmetro de entrada; id da ocorrência que queremos atualizar
responsavelLocalRouter.patch('/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {                           
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            criadoPor: user.id
        }, {
            nomeResponsavel: req.body.nomeResponsavel,
            cargoResponsavel: req.body.cargoResponsavel,
            documentoResponsavel: req.body.documentoResponsavel,
            entrevistaResponsavel: req.body.entrevistaResponsavel,
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