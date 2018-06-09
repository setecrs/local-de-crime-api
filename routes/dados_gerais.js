var Ocorrencia = require('../models/ocorrencia');
var Perito = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//dadosGeraisRouter
const express = require('express');
const dadosGeraisRouter = express.Router();

dadosGeraisRouter.use(checkToken);

//patch
// Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
dadosGeraisRouter.patch('/:idOcorrencia', util.ObjectIdIsValid, function(req, res) {
    var dataHora = new Date(req.body.dataHoraAcionamento);
    Ocorrencia.findOneAndUpdate({
        _id: req.params.idOcorrencia // idOcorrencia que foi passado na URL
        //criadoPor: req.user.id //removido para, se for o caso, ser tratado no frontend
    }, 
    {   
        numeroOcorrencia: req.body.numeroOcorrencia, 
        sede: req.body.sede, 
        //peritos: req.body.peritos, //removido por ser array será tratado em rota independente
        dataHoraAcionamento: req.body.dataHoraAcionamento
    },
    function(err, ocorrencia) {
        if (err) res.json("Erro interno: " + err);
        
        res.json('Dados salvos com sucesso.');
    });
});

//router export
module.exports = dadosGeraisRouter;