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

popularBancoRouter.use(checkToken);

var estados = [
    { nome: "Rio Grande do Sul", uf: "RS" },
    { nome: "Santa Catarina", uf: "SC" },
    { nome: "Outro" }
];

var municipios = [
    { nome: "Porto Alegre" },
    { nome: "Caxias do Sul" },
    { nome: "Pelotas" },
    { nome: "Santa Maria" },
    { nome: "Outro" }
];

var sedes = [
    { nome: "SR/RS" },
    { nome: "Outro" }
];

var tiposLocal = [
    { tipoLocal: "CEF" },
    { tipoLocal: "Colega" },
    { tipoLocal: "Correios" },
    { tipoLocal: "DNIT" },
    { tipoLocal: "Drogas" },
    { tipoLocal: "Estrangeiro" },
    { tipoLocal: "Instituto Federal" },
    { tipoLocal: "Moeda Falsa" },
    { tipoLocal: "Universidade Federal" },
    { tipoLocal: "Ignorar formulário" },
    { tipoLocal: "Outro" }
];

var tiposDelito = [
    { tipoDelito: "Arrombamento sem furto" },
    { tipoDelito: "Dano" },
    { tipoDelito: "Drogas" },
    { tipoDelito: "Falsidade ideológica" },
    { tipoDelito: "Furto com arrombamento" },
    { tipoDelito: "Furto sem arrombamento" },
    { tipoDelito: "Moeda Falsa" },
    { tipoDelito: "Não houve crime" },
    { tipoDelito: "Roubo" },
    { tipoDelito: "Ignorar formulário" },
    { tipoDelito: "Outro" }
];

var modusOperandi = [
    { modusOperandi: "À mão armada" },
    { modusOperandi: "Buraco na parede" },
    { modusOperandi: "Chave mixa" },
    { modusOperandi: "Chupa-cabra" },
    { modusOperandi: "Com violência" },
    { modusOperandi: "Correios-Arma-Pela-Porta-Giratoria" },
    { modusOperandi: "Correios-CortaAlarme-LevaDVR-UsaLuvas" },
    { modusOperandi: "Correios-Dois-De-Moto" },
    { modusOperandi: "Correios-Superbonder" },
    { modusOperandi: "Correios-Veiculo-Com-Endereco-Da-Abordagem" },
    { modusOperandi: "Correios-Veiculo-ZonaNorteAlvorada-Com-Endereco-Da-Abordagem" },
    { modusOperandi: "Correios-Veiculo-ZonaSul-Com-Endereco-Da-Abordagem" },
    { modusOperandi: "Explosivos" },
    { modusOperandi: "Forçar porta ou janela (sem quebrar vidro)" },
    { modusOperandi: "Furto de câmera ou monitor" },
    { modusOperandi: "Furto de pequeno valor" },
    { modusOperandi: "Furto por descuido" },
    { modusOperandi: "Levar o cofre inteiro" },
    { modusOperandi: "Maçarico" },
    { modusOperandi: "Moeda falsa" },
    { modusOperandi: "Não houve dano ou dano mínimo" },
    { modusOperandi: "Nomes e dados divergentes no AFIS-PF" },
    { modusOperandi: "Pé de cabra" },
    { modusOperandi: "Provável organização criminosa" },
    { modusOperandi: "Quebrou vidro" },
    { modusOperandi: "Outro" }
];

var tiposVestigio = [
    { tipoVestigio: "Biológico", nomeVestigio: "Cabelo" },
    { tipoVestigio: "Biológico", nomeVestigio: "DNA" },
    { tipoVestigio: "Biológico", nomeVestigio: "Sangue" },
    { tipoVestigio: "Biológico", nomeVestigio: "Outro" },

    { tipoVestigio: "Físico", nomeVestigio: "Alicate" },
    { tipoVestigio: "Físico", nomeVestigio: "Arma" },
    { tipoVestigio: "Físico", nomeVestigio: "Balaclava" },
    { tipoVestigio: "Físico", nomeVestigio: "Bituca de cigarro" },
    { tipoVestigio: "Físico", nomeVestigio: "Boné" },
    { tipoVestigio: "Físico", nomeVestigio: "Camiseta" },
    { tipoVestigio: "Físico", nomeVestigio: "Cartucho de munição" },
    { tipoVestigio: "Físico", nomeVestigio: "Chave de fenda" },
    { tipoVestigio: "Físico", nomeVestigio: "Copo" },
    { tipoVestigio: "Físico", nomeVestigio: "Estojo de munição" },
    { tipoVestigio: "Físico", nomeVestigio: "Ferramenta" },
    { tipoVestigio: "Físico", nomeVestigio: "Garrafa" },
    { tipoVestigio: "Físico", nomeVestigio: "Impressão papilar" },
    { tipoVestigio: "Físico", nomeVestigio: "Luvas" },
    { tipoVestigio: "Físico", nomeVestigio: "Marca de tinta" },
    { tipoVestigio: "Físico", nomeVestigio: "Martelo" },
    { tipoVestigio: "Físico", nomeVestigio: "Máscara cirúrgica" },
    { tipoVestigio: "Físico", nomeVestigio: "Mochila" },
    { tipoVestigio: "Físico", nomeVestigio: "Papel" },
    { tipoVestigio: "Físico", nomeVestigio: "Pé de cabra" },
    { tipoVestigio: "Físico", nomeVestigio: "Pegada" },
    { tipoVestigio: "Físico", nomeVestigio: "Projétil" },
    { tipoVestigio: "Físico", nomeVestigio: "Roupa" },
    { tipoVestigio: "Físico", nomeVestigio: "Sacola" },
    { tipoVestigio: "Físico", nomeVestigio: "Vidro" },
    { tipoVestigio: "Físico", nomeVestigio: "Outro" },

    { tipoVestigio: "Químico", nomeVestigio: "Droga" },
    { tipoVestigio: "Químico", nomeVestigio: "Explosivo" },
    { tipoVestigio: "Químico", nomeVestigio: "Solvente" },
    { tipoVestigio: "Químico", nomeVestigio: "Outro" }
];

//default
popularBancoRouter.get('/default', function (req, res) {
    if (req.user.username) {
        console.log(req.user.username);
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
                .catch(err => res.status(err.status).res.status(500).json({ message: err.message }));
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
        res.json({ message: "Banco restaurado com sucesso!" });

    } else {
        res.status(403).json({
            message: 'Usuário não autorizado para realizar esta operação!'
        });
    }
});

//router export
module.exports = popularBancoRouter;