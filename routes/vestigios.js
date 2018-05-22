var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//vestigiosRouter
const express = require('express');
const vestigiosRouter = express.Router();

vestigiosRouter.use(checkToken);

//patch
vestigiosRouter.patch('/:idOcorrencia', function(req, res) {
    res.status(403).json({message: 'Operção ainda não suportada para /vestigios/:idOcorrencia'});
});

//router export
module.exports = vestigiosRouter;