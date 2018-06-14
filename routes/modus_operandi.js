var Ocorrencia = require('../models/ocorrencia');
var ModusOperandi = require('../models/modus_operandi');
const checkToken = require('../config/check_token');
const util = require('../config/util');

//peritosAcionadosRouter
const express = require('express');
const modusOperandiRouter = express.Router();

modusOperandiRouter.use(checkToken);

//router
modusOperandiRouter.route('/:idOcorrencia')
.get(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .populate('modusOperandi')
    .then((ocorrencia) => {
        if(ocorrencia != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(ocorrencia.modusOperandi);
        }
        else {
            res.status(404).json({message: 'Esta ocorrência não existe!'});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .then((ocorrencia) => {
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            ocorrencia.modusOperandi.push(req.body.modusOperandi);
            ocorrencia.save()
            .then((ocorrencia) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(ocorrencia.modusOperandi);
            }, (err) => next(err));
        }
        else {
            res.status(404).json({message: 'Ocorrência inválida'});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .then((ocorrencia) => {
        var modusOperandi;
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            for(var i = (ocorrencia.modusOperandi.length - 1); i>=0; i--) {
                if(ocorrencia.modusOperandi[i].equals(req.body.modusOperandi)) {
                    modusOperandi = ocorrencia.modusOperandi.splice(i, 1);
                    break;
                }
            }
            if(modusOperandi) {
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(ocorrencia.modusOperandi);
                }, (err) => next(err));
            }
            else {
                res.status(404).json({message: 'Modus Operandi não vinculado a esta ocorrência!'});    
            }
        }
        else {
            res.status(404).json({message: 'Ocorrência inválida'});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//router export
module.exports = modusOperandiRouter;