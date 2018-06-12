var Ocorrencia = require('../models/ocorrencia');
var TipoLocal = require('../models/tipo_local');
var Municipio = require('../models/municipio');
var Estado = require('../models/estado');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//enderecoRouter
const express = require('express');
const enderecoRouter = express.Router();

enderecoRouter.use(checkToken);

//patch
// Salva as alterações da tela de endereço
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
enderecoRouter.route('/:idOcorrencia')
.patch(util.ObjectIdIsValid, (req, res, next) => {
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia) {
            // Demais campos
            if(ocorrencia.logradouro != null) ocorrencia.logradouro = req.body.logradouro;
            if(ocorrencia.numero != null) ocorrencia.numero = req.body.numero;
            if(ocorrencia.complemento != null) ocorrencia.complemento = req.body.complemento;

            // Salva alteracoes
            ocorrencia.save()
            .then((ocorrencia) => {
                res.json('Dados salvos com sucesso.');
            }, (err) => next(err));

            // Trata Tipo Local
            if(req.body.tipoLocal) {
                TipoLocal.findById(req.body.tipoLocal)
                .then((tipoLocal) => {
                    if(tipoLocal) {
                        ocorrencia.tipoLocal = req.body.tipoLocal;
                        ocorrencia.outroTipoLocal = req.body.outroTipoLocal;

                        // Salva alteracoes
                        ocorrencia.save()
                        .then((ocorrencia) => {
                            res.json('Dados salvos com sucesso.');
                        }, (err) => next(err));
                    }
                    else {
                        res.json('Tipo de Local inválido')
                    }
                })
                .catch((err) => res.json('Tipo de Local inválido'));
            }

            // Trata Estado
            if(req.body.estado) {
                Estado.findById(req.body.estado)
                .then((estado) => {
                    if(estado) {
                        ocorrencia.estado = req.body.estado;
                        ocorrencia.outroEstado = req.body.outroEstado;
                        ocorrencia.outroUF = req.body.outroUF;

                        // Salva alteracoes
                        ocorrencia.save()
                        .then((ocorrencia) => {
                            res.json('Dados salvos com sucesso.');
                        }, (err) => next(err));
                    }
                    else {
                        res.json('Estado inválido')
                    }
                })
                .catch((err) => res.json('Estado inválido'));
            }

            // Trata Municipio
            if(req.body.municipio) {
                Municipio.findById(req.body.municipio)
                .then((municipio) => {
                    if(municipio) {
                        ocorrencia.municipio = req.body.municipio;
                        ocorrencia.outroMunicipio = req.body.outroMunicipio;

                        // Salva alteracoes
                        ocorrencia.save()
                        .then((ocorrencia) => {
                            res.json('Dados salvos com sucesso.');
                        }, (err) => next(err));
                    }
                    else {
                        res.json('Municipio inválido')
                    }
                })
                .catch((err) => res.json('Municipio inválido'));
            }
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

/*
    Ocorrencia.findOneAndUpdate({
        _id: req.params.idOcorrencia,
        criadoPor: req.user.id
    }, {
        tipoLocal: req.body.tipoLocal,
        outroTipoLocal: req.body.outroTipoLocal,
        estado: req.body.estado,
        outroEstado: req.body.outroEstado,
        outroUF: req.body.outroUF,
        municipio: req.body.municipio,
        outroMunicipio: req.body.outroMunicipio,
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        complemento: req.body.complemento
    }, 
    function(err, ocorrencia) {
        if (err) res.json("Erro interno: " + err);
        
        res.json('Dados salvos com sucesso.');
    });
*/
//router export
module.exports = enderecoRouter;