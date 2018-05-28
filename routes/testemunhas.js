var Ocorrencia = require('../models/ocorrencia');
var Perito = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//enderecoRouter
const express = require('express');
const TestemunhasRouter = express.Router();

TestemunhasRouter.use(checkToken)

TestemunhasRouter.patch('/:idOcorrencia', function(req, res) {
    if(mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {
        Testemunha.findOneAndUpdate( {
            _id: req.params.idOcorrencia,
            criadoPor: Perito.id
        }, {
            nomeTestemunha: req.body.nomeTestemunha,
            documentoTestemunha: req.body.documentoTestemunha,
            funcaoTestemunha: req.body.funcaoTestemunha,
            entrevistaTestemunha: req.body.entrevistaTestemunha
        },
        function(err, ocorrencia) {
            if(err) res.status(500).json(err);
            res.json('Dados da testemunha atualizados.');  
        });
    } else {
        res.json('Id da ocorrência inválido.');
    }
});

//router export
module.exports = testemunhasRouter;