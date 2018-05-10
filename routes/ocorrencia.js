var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//ocorrenciaRouter
var express = require('express');
var ocorrenciaRouter = express.Router();

//get/:id
// Busca apenas uma única ocorrência, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos visualizar / atualizar
ocorrenciaRouter.get('/:idOcorrencia', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.findOne( {_id: req.params.idOcorrencia}) // idOcorrencia que foi passado na URL
        .then((ocorrencia) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(ocorrencia);
        }, (err) => next(err))
        .catch(err => res.status(err.status).json({ message: err.message }));
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };
});

//router export
module.exports = ocorrenciaRouter;