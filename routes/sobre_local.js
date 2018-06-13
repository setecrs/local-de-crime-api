var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//sobreLocalRouter
const express = require('express');
const sobreLocalRouter = express.Router();

sobreLocalRouter.use(checkToken);

//patch
sobreLocalRouter.route('/:idOcorrencia')
.patch(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia) {
            // Trata campos
            if(req.body.dataHoraChegada != null) ocorrencia.dataHoraChegada = req.body.dataHoraChegada;
            if(req.body.condicaoLocal != null) ocorrencia.condicaoLocal = req.body.condicaoLocal;
            if(req.body.InformacoesAdicionais != null) ocorrencia.InformacoesAdicionais = req.body.InformacoesAdicionais;

            // Salva alteracoes
            ocorrencia.save()
            .then((ocorrencia) => {
                res.json('Dados salvos com sucesso.');
            }, (err) => next(err));
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

//router export
module.exports = sobreLocalRouter;