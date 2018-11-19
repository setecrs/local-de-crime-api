var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
var TipoDelito = require('../models/tipo_delito');
const util = require('../config/util');
var sleep = require('sleep');

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
                if (ocorrencia && ocorrencia.ocorrenciaEncerrada == false) {
                    // Trata campos
                    if (req.body.dataOcorrencia != "null") ocorrencia.dataOcorrencia = new Date(parseInt(req.body.dataOcorrencia));
                    if (req.body.possiveisSuspeitos != "null") ocorrencia.possiveisSuspeitos = req.body.possiveisSuspeitos;
                    if (req.body.valoresSubtraidos != "null") ocorrencia.valoresSubtraidos = req.body.valoresSubtraidos;
                    if (req.body.outroTipoDelito != "null") ocorrencia.outroTipoDelito = req.body.outroTipoDelito;

                    // Trata tipo delito
                    var delitosValidos = [];
                    if(req.body.tipoDelito != "null"){  
                        TipoDelito.find({ tipoDelito: req.body.tipoDelito })
                            .then(tipoDelito => {
                                for(i = 0; i < tipoDelito.length; i++){
                                    delitosValidos.push(tipoDelito[i]._id);
                                }

                                ocorrencia.tipoDelito = delitosValidos;

                                ocorrencia.save()
                                    .then((ocorrencia) => {
                                        res.json('Dados salvos com sucesso!');
                                    }, (err) => next(err));
                                        });
                    }

                    
                }
                else {
                    res.json('Ocorrência inválida.');
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//router export
module.exports = sobreFatoRouter;