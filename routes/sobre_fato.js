var Ocorrencia = require('../models/ocorrencia');
var Perito = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//sobreFatoRouter
const express = require('express');
const sobreFatoRouter = express.Router();

sobreFatoRouter.use(checkToken);

//patch
sobreFatoRouter.patch('/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia // idOcorrencia que foi passado na URL
            //criadoPor: req.user.id //removido para, se for o caso, ser tratado no frontend
        }, 
        {   //como estamos utilizando o método HTTP PATCH os campos que não forem recebidos
             
            dataOcorrencia: req.body.dataOcorrencia,
            tipoDelito: req.body.tipoDelito,
            //: req.body.modusOperandi, //array, tratado em rota diferente
            possiveisSuspeitos: req.body.possiveisSuspeitos,
            valoresSubtraidos: req.body.valoresSubtraidos,
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
module.exports = sobreFatoRouter;