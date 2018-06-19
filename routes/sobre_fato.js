var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//sobreFatoRouter
const express = require('express');
const sobreFatoRouter = express.Router();

sobreFatoRouter.use(checkToken);

//patch
sobreFatoRouter.route('/:idOcorrencia')
.patch(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        //criadoPor: req.user.id //removido para, se for o caso, ser tratado no frontend
    })
    .then((ocorrencia) => {
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            // Trata campos
            if(req.body.dataOcorrencia != null) ocorrencia.dataOcorrencia = req.body.dataOcorrencia;
            if(req.body.tipoDelito != null) ocorrencia.tipoDelito = req.body.tipoDelito;
            if(req.body.outroTipoDelito != null) ocorrencia.outroTipoDelito = req.body.outroTipoDelito;
            if(req.body.modusOperandi != null) ocorrencia.modusOperandi = req.body.modusOperandi; //req.body.modusOperandi, //array, tratado em rota diferente
            if(req.body.outroModusOperandi != null) ocorrencia.outroModusOperandi = req.body.outroModusOperandi;
            if(req.body.possiveisSuspeitos != null) ocorrencia.possiveisSuspeitos = req.body.possiveisSuspeitos;
            if(req.body.valoresSubtraidos != null) ocorrencia.valoresSubtraidos = req.body.valoresSubtraidos;

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
module.exports = sobreFatoRouter;