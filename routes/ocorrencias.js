var Ocorrencia = require('../models/ocorrencia');
var User = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');

//ocorrenciaRouter
var express = require('express');
var ocorrenciasRouter = express.Router();

ocorrenciasRouter.use(checkToken);

//get/todas
// Lista todas as demais ocorrências
ocorrenciasRouter.get('/todas', function(req, res) {
    Ocorrencia.find({}) 
    // .select('dataOcorrencia dataHoraChegada') // select: campos que queremos filtrar
    .populate('criadoPor', 'name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
    .exec(function (err, ocorrencia) {
        if (err) return err;

        if (ocorrencia && ocorrencia.length > 0) {
            res.json(ocorrencia);
        } else {
            res.json('Nenhuma ocorrência encontrada.')
        }
    });
});

//get
// Lista todas as ocorrências do usuario logado
ocorrenciasRouter.get('/', function(req, res) {
    Ocorrencia.find({ criadoPor: req.user.id }) // Foi passado o id do perito como filtro, pois queremos apenas as ocorrências dele
    // .select('dataOcorrencia dataHoraChegada') // select: campos que queremos filtrar
    .populate('criadoPor', 'name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
    .exec(function (err, ocorrencia) {
        if (err) return err;

        if (ocorrencia && ocorrencia.length > 0) {
            res.json(ocorrencia);
        } else {
            res.json('Nenhuma ocorrência encontrada.')
        }
    });
});

//get/:id
// Busca apenas uma única ocorrência, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos visualizar / atualizar
ocorrenciasRouter.get('/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {   
        Ocorrencia.findOne({ _id: req.params.idOcorrencia, criadoPor: req.user.id }) // idOcorrencia que foi passado na URL
            // .select('numeroOcorrencia sede peritosAcionados dataHoraAcionamento') // select implícito: campos que queremos filtrar
            .populate('criadoPor', 'name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
            .exec(function (err, ocorrencia) {
                if (err) return err;
            
                if (ocorrencia) {
                    res.json(ocorrencia);
                } else {
                    res.json('Nenhuma ocorrência encontrada.')
                }
        });
    } else {
        res.json('Id da ocorrência inválido.')        
    }
});

//post
// Cria uma nova ocorrência para o usuario logado
ocorrenciasRouter.post('/', function(req, res) {
    Ocorrencia.create({ criadoPor: req.user.id }, // os campos que não forem passado receberão o valor padrão, definido no seu Model
        function (err, ocorrencia) {
            if (err) return err;

            res.json('Ocorrência criada com sucesso.');
        }
    );
});

//router export
module.exports = ocorrenciasRouter;