var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//peritosAcionadosRouter
const express = require('express');
const peritosAcionadosRouter = express.Router();

peritosAcionadosRouter.use(checkToken);

//router
peritosAcionadosRouter.route('/:idOcorrencia')
.get(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .populate('peritosAcionados', '-hashed_password')
    .then((ocorrencia) => {
        if(ocorrencia) {
            res.json(ocorrencia.peritosAcionados);
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .then((ocorrencia) => {
        if(ocorrencia) {
            if(req.body.peritoAcionado) {
                ocorrencia.peritosAcionados.push(req.body.peritoAcionado);
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.json(ocorrencia);
                }, (err) => next(err));
            }
            else {
                res.json('Policial inválido');
            }
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .then((ocorrencia) => {
        var idPerito;
        if(ocorrencia) {
            for(var i = (ocorrencia.peritosAcionados.length - 1); i>=0; i--) {
                if(ocorrencia.peritosAcionados[i].equals(req.body.peritoAcionado)) {
                    idPerito = ocorrencia.peritosAcionados.splice(i, 1);
                    break;
                }
            }
            if(idPerito) {
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.json(ocorrencia.peritosAcionados);
                }, (err) => next(err));
            }
            else {
                res.json('Perito não vinculado a esta ocorrência.');    
            }
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//router export
module.exports = peritosAcionadosRouter;