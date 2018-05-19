var Estado = require('../models/estado');
var Municipio = require('../models/municipio');
var Sede = require("../models/sede");
var TipoLocal = require("../models/tipo_local");
var TipoDelito = require("../models/tipo_delito");
var ModusOperandi = require("../models/modus_operandi");
var TipoVestigio = require("../models/tipo_vestigio");

const checkToken = require('../config/check_token');

//popularBancoRouter
var express = require('express');
var popularBancoRouter = express.Router();

var estados = [
    { nome: "Rio Grande do Sul", uf: "RS" },
    { nome: "Santa Catarina", uf: "SC" }
];

var municipios = [
    { nome: "Porto Alegre" },
    { nome: "Caxias do Sul" },
    { nome: "Santa Maria" },
    { nome: "Pelotas" }
];

var sedes = [
    { nome: "SR/RS" },
    { nome: "Outra" }
];

var tiposLocal = [
    { tipoLocal: "Correios" },
    { tipoLocal: "CEF" },
    { tipoLocal: "Universidade Federal" },
    { tipoLocal: "Colega" },
    { tipoLocal: "DNIT" },
    { tipoLocal: "Instituto Federal" },
    { tipoLocal: "Drogas" },
    { tipoLocal: "Moeda Falsa" },
    { tipoLocal: "Estrangeiro" },
    { tipoLocal: "Ignorar formulário" },
    { tipoLocal: "Outro" }
];

var tiposDelito = [
    { tipoDelito: "Dano" },
    { tipoDelito: "Arrombamento sem furto" },
    { tipoDelito: "Furto sem arrombamento" },
    { tipoDelito: "Furto com arrombamento" },
    { tipoDelito: "Roubo" },
    { tipoDelito: "Drogas" },
    { tipoDelito: "Moeda Falsa" },
    { tipoDelito: "Falsidade ideológica" },
    { tipoDelito: "Não houve crime" },
    { tipoDelito: "Ignorar formulário" },
    { tipoDelito: "Outro" }
];

var modusOperandi = [
    { modusOperandi: "Chupa-cabra" },
    { modusOperandi: "Explosivos" },
    { modusOperandi: "Maçarico" },
    { modusOperandi: "Outro" }
];

var tiposVestigio = [
    { tipoVestigio: "Sangue" },
    { tipoVestigio: "Projétil" },
    { tipoVestigio: "Outro" }
];

//default
popularBancoRouter.get('/default', function (req, res) {
    if (user = checkToken(req)) {
        if (user.username == "admin") {
            
            // Limpa o banco
            Municipio.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            Estado.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            Sede.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            TipoLocal.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            TipoDelito.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            ModusOperandi.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            TipoVestigio.remove({}, function (err) {
                if (err) {
                    console.log(err);
                }
            });

            // Insere Estados
            Estado.create(estados, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Estados criados com sucesso!");

                    // Insere Municipios RS
                    Estado.findOne({ uf: "RS" })
                    .then((rs) => {
                        municipios.forEach(function (municipio) {
                            Municipio.create({ nome: municipio.nome, estado: rs._id });
                        });
                        console.log("Municípios do RS criados com sucesso!");
                    }, (err) => next(err))
                    .catch(err => res.status(err.status).json({ message: err.message }));
                }
            });

            // Insere Sedes
            Sede.create(sedes, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Sedes criadas com sucesso")
                }
            });

            // Insere tipos de Local
            TipoLocal.create(tiposLocal, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Tipos de Local criados com sucesso")
                }
            });

            // Insere tipos de Delito
            TipoDelito.create(tiposDelito, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Tipos de Delito criados com sucesso")
                }
            });

            // Insere Modus Operandi
            ModusOperandi.create(modusOperandi, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Modus Operandi criados com sucesso")
                }
            });

            // Insere tipos de Vestigio
            TipoVestigio.create(tiposVestigio, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Tipos de Vestígio criados com sucesso")
                }
            });

            // Response
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ message: "Base restaurada com sucesso!" });

        } else {
            res.status(401).json({
                message: 'Usuário não autorizado para realizar esta operação!'
            });
        }
    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    }
});


//router export
module.exports = popularBancoRouter;