var Ocorrencia = require('../models/ocorrencia');
var TipoLocal = require('../models/tipo_local');
const checkToken = require('../config/check_token');
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
        //criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia && ocorrencia.ocorrenciaEncerrada==false) {
            // Trata campos
            if(ocorrencia.estado != null) ocorrencia.estado = req.body.estado;
            if(ocorrencia.municipio != null) ocorrencia.municipio = req.body.municipio;
            if(ocorrencia.logradouro != null) ocorrencia.logradouro = req.body.logradouro;
            if(ocorrencia.numero != null) ocorrencia.numero = req.body.numero;
            if(ocorrencia.complemento != null) ocorrencia.complemento = req.body.complemento;

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
                            res.json('Dados salvos com sucesso!');
                        }, (err) => next(err));

                        /* 
                        * passado de Objeto para String
                        * 
                        // Trata Estado
                        if(req.body.estado) {
                            Estado.findById(req.body.estado)
                            .then((estado) => {
                                if(estado) {
                                    ocorrencia.estado = req.body.estado;
                                    ocorrencia.outroEstado = req.body.outroEstado;
                                    ocorrencia.outroUF = req.body.outroUF;

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
                                                // Salva alteracoes
                                                ocorrencia.save()
                                                .then((ocorrencia) => {
                                                    res.json('Municipio inválido! Apenas Município não foi alterado.');
                                                }, (err) => next(err));
                                            }
                                        })
                                        .catch((err) => {
                                            // Salva alteracoes
                                            ocorrencia.save()
                                            .then((ocorrencia) => {
                                                res.json('Municipio inválido! Apenas Município não foi alterado.');
                                            }, (err) => next(err));
                                        });
                                    }
                                    else {
                                        // Salva alteracoes
                                        ocorrencia.save()
                                        .then((ocorrencia) => {
                                            res.json('Dados salvos com sucesso! Município não enviado.');
                                        }, (err) => next(err));
                                    }
                                }
                                else {
                                    // Salva alteracoes
                                    ocorrencia.save()
                                    .then((ocorrencia) => {
                                        res.json('Estado inválido! Estado e Município não foram alterados.');
                                    }, (err) => next(err));
                                }
                            })
                            .catch((err) => {
                                // Salva alteracoes
                                ocorrencia.save()
                                .then((ocorrencia) => {
                                    res.json('Estado inválido! Estado e Município não foram alterados.');
                                }, (err) => next(err));
                            });
                        }
                        else {
                            // Salva alteracoes
                            ocorrencia.save()
                            .then((ocorrencia) => {
                                res.json('Dados salvos com sucesso! Estado não enviado. Município não foi alterado.');
                            }, (err) => next(err));
                        }
                        */
                    }
                    else {
                        res.json('Tipo de Local inválido!');
                    }
                })
                .catch((err) => {
                    res.json('Tipo de Local inválido!');
                });
            }
            else {
                // Salva alteracoes
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.json('Dados salvos com sucesso!');
                }, (err) => next(err));
            }
        }
        else {
            res.json('Ocorrência inválida.');
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

//router export
module.exports = enderecoRouter;