var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//sobreFatoRouter
const express = require('express');
const sobreFatoRouter = express.Router();

sobreFatoRouter.use(checkToken);

//patch
sobreFatoRouter.patch('/:idOcorrencia', function(req, res) {
    res.status(403).json({message: 'Operção ainda não suportada para /sobre_fato/:idOcorrencia'});
});

//router export
module.exports = sobreFatoRouter;