var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//dadosGeraisRouter
const express = require('express');
const dadosGeraisRouter = express.Router();

dadosGeraisRouter.use(checkToken);

//patch
// Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
dadosGeraisRouter.route('/:idOcorrencia')
.patch(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            // Trata campos
            if(req.body.numeroOcorrencia != "null") ocorrencia.numeroOcorrencia = req.body.numeroOcorrencia;
            if(req.body.sede != "null") ocorrencia.sede = req.body.sede;
            if(req.body.dataHoraAcionamento != "null") ocorrencia.dataHoraAcionamento = new Date(parseInt(req.body.dataHoraAcionamento));
            if(req.body.policiaisAcionados != "null") ocorrencia.policiaisAcionados = req.body.policiaisAcionados;
            
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
module.exports = dadosGeraisRouter;