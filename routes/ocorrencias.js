var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//ocorrenciaRouter
var express = require('express');
var ocorrenciasRouter = express.Router();

//get/todas
// Lista todas as demais ocorrências
ocorrenciasRouter.get('/todas', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.find({})
        .then((ocorrencias) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(ocorrencias);
        }, (err) => next(err))
        .catch(err => res.status(err.status).json({ message: err.message }));
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };
});

//get
// Lista todas as ocorrências do usuario logado
ocorrenciasRouter.get('/', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.find({ criadoPor: user.id })
        .then((ocorrencias) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(ocorrencias);
        }, (err) => next(err))
        .catch(err => res.status(err.status).json({ message: err.message }));
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };
});

//post
// Cria uma nova ocorrência para o usuario logado
ocorrenciasRouter.post('/', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.create({ criadoPor: user.id }) // os campos que não forem passados receberão o valor padrão, definido no seu Model
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
    }
});

//router export
module.exports = ocorrenciasRouter;