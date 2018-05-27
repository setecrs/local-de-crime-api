var Ocorrencia = require('../models/ocorrencia');
var Vestigio = require('../models/vestigio');
const checkToken = require('../config/check_token');

//vestigiosRouter
const express = require('express');
const vestigiosRouter = express.Router();

vestigiosRouter.use(checkToken);

vestigiosRouter.route('/:idOcorrencia')
.get((req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .populate({ 
        path: 'vestigios',
        populate: {
          path: 'tipo',
          model: 'TipoVestigio'
        } 
     })
    .then((ocorrencia) => {
        if(ocorrencia != null) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(ocorrencia.vestigios);
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
        if(ocorrencia != null) {
            var vestigio = new Vestigio ({
                tipo: req.body.tipo,
                coletado: req.body.coletado,
                etiqueta: req.body.etiqueta,
                informacoesAdicionais: req.body.informacoesAdicionais
            });
            vestigio.save();

            ocorrencia.vestigios.push(vestigio._id);
            ocorrencia.save()
            .then((ocorrencia) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(ocorrencia.vestigios);
            }, (err) => next(err));
        }
        else {
            res.status(404).json({message: 'Esta ocorrência não existe!'});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Ocorrencia.findById(req.params.idOcorrencia)
    .then((ocorrencia) => {
        var idVestigio;
        if(ocorrencia != null) {
            for(var i = (ocorrencia.vestigios.length - 1); i>=0; i--) {
                if(ocorrencia.vestigios[i].equals(req.body.vestigio)) {
                    idVestigio = ocorrencia.vestigios.splice(i, 1);
                    break;
                }
            }
            if(idVestigio) {
                ocorrencia.save()
                .then((ocorrencia) => {
                    Vestigio.findByIdAndRemove(idVestigio[0])
                    .then((vestigio) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(ocorrencia.vestigios);
                    })
                    .catch((err) => next(err));
                }, (err) => next(err));
            }
            else {
                res.status(404).json({message: 'Vestígio não vinculado a esta ocorrência!'});    
            }
        }
        else {
            res.status(404).json({message: 'Esta ocorrência não existe!'});
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//router export
module.exports = vestigiosRouter;