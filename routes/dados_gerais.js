var Ocorrencia = require('../models/ocorrencia');
var Perito = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//dadosGeraisRouter
const express = require('express');
const dadosGeraisRouter = express.Router();

dadosGeraisRouter.use(checkToken);

//patch
// Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
dadosGeraisRouter.patch('/:idOcorrencia', function(req, res) {
    var dataHora = new Date(req.body.dataHoraAcionamento);
    console.log(dataHora);
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia // idOcorrencia que foi passado na URL
            //criadoPor: req.user.id //removido para, se for o caso, ser tratado no frontend
        }, 
        {   //como estamos utilizando o método HTTP PATCH os campos que não forem recebidos
            numeroOcorrencia: req.body.numeroOcorrencia, 
            sede: req.body.sede, 
            //peritos: req.body.peritos, //removido por ser array será tratado em rota independente
            dataHoraAcionamento: dataHora
        },
        function(err, ocorrencia) {
            if (err) res.status(500).json(err);
            
            res.json('Dados salvos com sucesso.');
        });
    } else {
        res.json('Id da ocorrência inválido.')
    }
});

//router export
module.exports = dadosGeraisRouter;