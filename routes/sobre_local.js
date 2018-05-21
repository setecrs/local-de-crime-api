var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//sobreLocalRouter
const express = require('express');
const sobreLocalRouter = express.Router();

sobreLocalRouter.use(checkToken);

//patch
sobreLocalRouter.patch('/:idOcorrencia', function(req, res) {
    res.status(403).json({message: 'Operção ainda não suportada para /sobre_local/:idOcorrencia'});
});

//router export
module.exports = sobreLocalRouter;