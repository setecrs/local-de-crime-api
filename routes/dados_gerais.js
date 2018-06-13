var Ocorrencia = require('../models/ocorrencia');
var Sede = require('../models/sede');
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
    var dataHora = new Date(req.body.dataHoraAcionamento);
    Ocorrencia.findOne({
        _id: req.params.idOcorrencia, // idOcorrencia que foi passado na URL
        criadoPor: req.user.id
    })
    .then((ocorrencia) => {
        if(ocorrencia) {
            // Demais campos
            if(req.body.numeroOcorrencia != null) ocorrencia.numeroOcorrencia = req.body.numeroOcorrencia;
            if(req.body.dataHoraAcionamento) ocorrencia.dataHoraAcionamento = req.body.dataHoraAcionamento;
            //req.body.peritos removido, por ser array será tratado em rota independente
            
            // Trata Sede
            if(req.body.sede) {
                Sede.findById(req.body.sede)
                .then((sede) => {
                    if(sede) {
                        ocorrencia.sede = req.body.sede;
                        ocorrencia.outraSede = req.body.outraSede;

                        // Salva alteracoes
                        ocorrencia.save()
                        .then((ocorrencia) => {
                            res.json('Dados salvos com sucesso.');
                        }, (err) => next(err));
                    }
                    else {
                        res.json('Sede inválida');
                    }
                })
                .catch((err) => res.json('Sede inválida'));
            }
            else {
                // Salva alteracoes
                ocorrencia.save()
                .then((ocorrencia) => {
                    res.json('Dados salvos com sucesso.');
                }, (err) => next(err));
            }
        }
        else {
            res.json('Ocorrência não encontrada.');
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
});

//router export
module.exports = dadosGeraisRouter;