var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//enderecoRouter
const express = require('express');
const testemunhasRouter = express.Router();

testemunhasRouter.use(checkToken)

//patch
testemunhasRouter.route('/:idOcorrencia')
.patch(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        //criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            // Trata campos
            if(req.body.nomeTestemunha != null) ocorrencia.nomeTestemunha = req.body.nomeTestemunha;
            if(req.body.documentoTestemunha != null) ocorrencia.documentoTestemunha = req.body.documentoTestemunha;
            if(req.body.funcaoTestemunha != null) ocorrencia.funcaoTestemunha = req.body.funcaoTestemunha;
            if(req.body.entrevistaTestemunha != null) ocorrencia.entrevistaTestemunha = req.body.entrevistaTestemunha;

            // Salva alteracoes
            ocorrencia.save()
            .then((ocorrencia) => {
                res.json('Dados salvos com sucesso.');
            }, (err) => next(err));
        }
        else {
            res.json('Ocorrência inválida.');
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

//router export
module.exports = testemunhasRouter;