var Estado = require('../models/estado');
var Municipio = require('../models/municipio');
var Sede = require("../models/sede");
var TipoLocal = require("../models/tipo_local");
var TipoDelito = require("../models/tipo_delito");
var ModusOperandi = require("../models/modus_operandi");
var TipoVestigio = require("../models/tipo_vestigio");
const checkToken = require('../config/check_token');

//obterListasRouter
const express = require('express');
const obterListasRouter = express.Router();

obterListasRouter.use(checkToken);

//get
// Lista todas as ocorrências do usuario logado
obterListasRouter.get('/', function(req, res) {
    var estados, municipios, sedes, tipoLocals, tipoDelitos, modusOperandis, tipoVestigios;
    
    Estado.find({}).exec(function (err, estados) {
        if (err) return err;

        Municipio.find({}).populate('estado').exec(function (err, municipios) {
            if (err) return err;

            Sede.find({}).exec(function (err, sedes) {
                if (err) return err;
    
                TipoLocal.find({}).exec(function (err, tipoLocals) {
                    if (err) return err;
        
                    TipoDelito.find({}).exec(function (err, tipoDelitos) {
                        if (err) return err;
            
                        ModusOperandi.find({}).exec(function (err, modusOperandis) {
                            if (err) return err;
                
                            TipoVestigio.find({}).exec(function (err, tipoVestigios) {
                                if (err) return err;
                    
                                res.json({estados: estados, municipios: municipios, sedes: sedes, tipoLocals: tipoLocals,
                                    tipoDelitos:tipoDelitos, modusOperandis:modusOperandis, tipoVestigios:tipoVestigios});
                            });
                        });
                    });
                });
            });
        });
    });
    
});


//router export
module.exports = obterListasRouter;
