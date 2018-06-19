var Ocorrencia = require('../models/ocorrencia');
var User = require('../models/user');
const checkToken = require('../config/check_token');
const mongoose = require('mongoose');
const util = require('../config/util');

//ocorrenciaRouter
var express = require('express');
var ocorrenciasRouter = express.Router();

ocorrenciasRouter.use(checkToken);

//get/todas
// Lista todas as demais ocorrências
ocorrenciasRouter.get('/todas', function(req, res) {
    Ocorrencia.find({}) 
    .populate('criadoPor', '_id name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
    .populate('policiaisAcionados', '_id name username')
    .populate('tipoLocal')
    .populate('tipoDelito')
    // .populate('modusOperandi')
    .populate({ 
        path: 'vestigios',
        populate: {
          path: 'tipo',
          model: 'TipoVestigio'
        } 
     })
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
    .populate('criadoPor', '_id name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
    .populate('policiaisAcionados', '_id name username')
    .populate('tipoLocal')
    .populate('tipoDelito')
    // .populate('modusOperandi')
    .populate({ 
        path: 'vestigios',
        populate: {
          path: 'tipo',
          model: 'TipoVestigio'
        } 
     })
    .exec(function (err, ocorrencia) {
        if (err) return res.json("Erro interno: " + err);

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
ocorrenciasRouter.get('/:idOcorrencia', util.ObjectIdIsValid, function(req, res) {
    Ocorrencia.findOne({ _id: req.params.idOcorrencia }) // idOcorrencia que foi passado na URL
    .populate('criadoPor', '_id name username', User) // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
    .populate('policiaisAcionados', '_id name username')
    .populate('tipoLocal')
    .populate('tipoDelito')
    // .populate('modusOperandi')
    .populate({ 
        path: 'vestigios',
        populate: {
          path: 'tipo',
          model: 'TipoVestigio'
        } 
     })
    .exec(function (err, ocorrencia) {
        if (err) return res.json("Erro interno: " + err);

        if (ocorrencia) {
            res.json(ocorrencia);
        } else {
            res.json('Nenhuma ocorrência encontrada.')
        }
    });
});

//post
// Cria uma nova ocorrência para o usuario logado
ocorrenciasRouter.post('/', function(req, res) {
    Ocorrencia.create({ criadoPor: req.user.id }, // os campos que não forem passado receberão o valor padrão, definido no seu Model
        function (err, ocorrencia) {
            if (err) return res.json("Erro interno: " + err);

            res.json(ocorrencia);
        }
    );
});

//post
//Finaliza uma determinada ocorrencia
ocorrenciasRouter.patch('/finalizar/:idOcorrencia', function(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {                   
        Ocorrencia.findOneAndUpdate({
            _id: req.params.idOcorrencia,
            //criadoPor: req.user.id
        }, {
            ocorrenciaEncerrada: true
        }, 
        function(err, ocorrencia) {
            if (err) res.status(500).json(err);
            
            res.json('Dados salvos com sucesso.');
        })
    } else {
        res.json('Id da ocorrência inválido.')
    }
});

//router export
module.exports = ocorrenciasRouter;