var Ocorrencia = require('../models/ocorrencia');
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
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {           
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            criadoPor: user.id
        }, // idOcorrencia que foi passado na URL
        {
            numeroOcorrencia: req.body.numeroOcorrencia, // campos que queremos atualizar,
            sede: req.body.sede, // como estamos utilizando o método HTTP PATCH
            peritos: req.body.peritos, // os campos que não forem recebidos
            dataHoraAcionamento: req.body.dataHoraAcionamento // NÃO serão atualizados
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