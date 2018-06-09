var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//policiaisAcionadosRouter
const express = require('express');
const policiaisAcionadosRouter = express.Router();

policiaisAcionadosRouter.use(checkToken);

//router
policiaisAcionadosRouter.route('/:idOcorrencia')
.get(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .populate('policiaisAcionados', '-hashed_password')
    .then((ocorrencia) => {
        if(ocorrencia) {
            res.json(ocorrencia.policiaisAcionados);
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
            if(req.body.policiaisAcionados) {
                ocorrencia.policiaisAcionados.push(req.body.policiaisAcionados);
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
            for(var i = (ocorrencia.policiaisAcionados.length - 1); i>=0; i--) {
                if(ocorrencia.policiaisAcionados[i].equals(req.body.policiaisAcionados)) {
                    idPerito = ocorrencia.policiaisAcionados.splice(i, 1);
                    break;
                }
            }
            if(idPerito) {
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.json(ocorrencia.policiaisAcionados);
                }, (err) => next(err));
            }
            else {
                res.json('Policial não vinculado a esta ocorrência.');    
            }
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//router export
module.exports = policiaisAcionadosRouter;