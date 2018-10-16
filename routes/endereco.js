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
            if(ocorrencia.estado != "null") ocorrencia.estado = req.body.estado;
            if(ocorrencia.municipio != "null") ocorrencia.municipio = req.body.municipio;
            if(ocorrencia.logradouro != "null") ocorrencia.logradouro = req.body.logradouro;
            if(ocorrencia.numero != "null") ocorrencia.numero = req.body.numero;
            if(ocorrencia.complemento != "null") ocorrencia.complemento = req.body.complemento;

            // Trata Tipo Local
            if(req.body.tipoLocal != "null") {
                TipoLocal.find({tipoLocal: req.body.tipoLocal})
                .then(tipoLocal => {
                    if(tipoLocal != null && tipoLocal != undefined) {
                        ocorrencia.tipoLocal = tipoLocal[0]._doc._id;
                        ocorrencia.outroTipoLocal = req.body.outroTipoLocal;
                        // Salva alteracoes
                        ocorrencia.save()
                        .then((ocorrencia) => {
                            res.json('Dados salvos com sucesso!');
                        }, (err) => next(err));
                    }
                    else {
                        res.json('Tipo de Local nao encontrado');
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