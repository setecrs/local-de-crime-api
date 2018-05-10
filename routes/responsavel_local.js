var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//responsavelLocalRouter
const express = require('express');
const responsavelLocalRouter = express.Router();

//patch
responsavelLocalRouter.patch('/:idOcorrencia', function(req, res) {
    res.status(403).json({message: 'Operção ainda não suportada para /responsavel_local/:idOcorrencia'});
});

//router export
module.exports = responsavelLocalRouter;