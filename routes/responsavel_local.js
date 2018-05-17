var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//responsavelLocalRouter
const express = require('express');
const responsavelLocalRouter = express.Router();

//get e post não necessários pois são partes da Ocorrência.

//patch (atualiza dados de entrada no Responsável)
//parâmetro de entrada; id da ocorrência que queremos atualizar
responsavelLocalRouter.patch('/:idOcorrencia', function(req, res) {
        if (user = checkToken(req)) {
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            criadoPor: user.id
        }, {
            nomeResponsavel: req.body.nomeResponsavel,
            cargoResponsavel: req.body.cargoResponsavel,
            documentoResponsavel: req.body.documentoResponsavel,
            entrevistaResponsavel: req.body.entrevistaResponsavel,
        }, {
            new: true,
            select: 'nomeResponsavel cargoResponsavel documentoResponsavel entrevistaResponsavel'
        }, function(err, ocorrencia) {
            if (err) res.status(500).json(err);
            res.json(ocorrencia);
        });
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };
});

//router export
module.exports = responsavelLocalRouter;