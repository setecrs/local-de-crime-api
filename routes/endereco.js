var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//enderecoRouter
const express = require('express');
const enderecoRouter = express.Router();

//patch
// Salva as alterações da tela de endereço
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
enderecoRouter.patch('/:idOcorrencia', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            criadoPor: user.id
        }, {
            tipoLocal: req.body.tipoLocal,
            estado: req.body.estado,
            municipio: req.body.municipio,
            logradouro: req.body.logradouro,
            complemento: req.body.complemento
        }, {
            new: true,
            select: 'tipoLocal estado municipio logradouro complemento'
        }, function(err, ocorrencia) {
            if (err) res.status(500).json(err);

            res.json(ocorrencia);
        });
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };
});

//router export
module.exports = enderecoRouter;