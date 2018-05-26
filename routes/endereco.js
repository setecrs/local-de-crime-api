var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//enderecoRouter
const express = require('express');
const enderecoRouter = express.Router();

enderecoRouter.use(checkToken);

//patch
// Salva as alterações da tela de endereço
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
enderecoRouter.patch('/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {                   
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            //criadoPor: req.user.id //removido para, se for o caso, ser tratado no frontend
        }, {
            tipoLocal: req.body.tipoLocal,
            estado: req.body.estado,
            municipio: req.body.municipio,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            complemento: req.body.complemento
        }, 
        function(err, ocorrencia) {
            if (err) res.status(500).json(err);
            console.log(ocorrencia);
            res.json('Dados salvos com sucesso.');
        })
    } else {
        res.json('Id da ocorrência inválido.')
    }
});

//router export
module.exports = enderecoRouter;