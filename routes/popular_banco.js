var Estado = require("../models/estado");
var Municipio = require("../models/municipio");
var Sede = require("../models/sede");
var TipoLocal = require("../models/tipo_local");
var TipoDelito = require("../models/tipo_delito");
var ModusOperandi = require("../models/modus_operandi");
var TipoVestigio = require("../models/tipo_vestigio");
var Ocorrencia = require("../models/ocorrencia");

const checkToken = require("../config/check_token");

//popularBancoRouter
var express = require("express");
var popularBancoRouter = express.Router();

popularBancoRouter.use(checkToken);

var estados = [
    { nome: "Rio Grande do Sul", uf: "RS" },
    { nome: "Santa Catarina", uf: "SC" },
    { nome: "Outro", uf: "XX" }
];

var municipiosRS = [
    { nome: "Porto Alegre" },
    { nome: "Caxias do Sul" },
    { nome: "Pelotas" },
    { nome: "Santa Maria" },
    { nome: "Outro" }
];

var municipiosSC = [
    { nome: "Outro" }
];

var municipiosOutro = [
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
    { texto: "À mão armada" },
    { texto: "Buraco na parede" },
    { texto: "Chave mixa" },
    { texto: "Chupa-cabra" },
    { texto: "Com violência" },
    { texto: "Correios-Arma-Pela-Porta-Giratoria" },
    { texto: "Correios-CortaAlarme-LevaDVR-UsaLuvas" },
    { texto: "Correios-Dois-De-Moto" },
    { texto: "Correios-Superbonder" },
    { texto: "Correios-Veiculo-Com-Endereco-Da-Abordagem" },
    { texto: "Correios-Veiculo-ZonaNorteAlvorada-Com-Endereco-Da-Abordagem" },
    { texto: "Correios-Veiculo-ZonaSul-Com-Endereco-Da-Abordagem" },
    { texto: "Explosivos" },
    { texto: "Forçar porta ou janela (sem quebrar vidro)" },
    { texto: "Furto de câmera ou monitor" },
    { texto: "Furto de pequeno valor" },
    { texto: "Furto por descuido" },
    { texto: "Levar o cofre inteiro" },
    { texto: "Maçarico" },
    { texto: "Moeda falsa" },
    { texto: "Não houve dano ou dano mínimo" },
    { texto: "Nomes e dados divergentes no AFIS-PF" },
    { texto: "Pé de cabra" },
    { texto: "Provável organização criminosa" },
    { texto: "Quebrou vidro" },
    { texto: "Outro" }
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
popularBancoRouter.get("/default", function (req, res) {
    if (req.user.username === "admin") {
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
                    municipiosRS.forEach(function (municipio) {
                        Municipio.create({ nome: municipio.nome, estado: rs._id });
                    });
                    console.log("Municípios do RS criados com sucesso!");
                }, (err) => next(err))
                .catch(err => res.status(err.status).res.status(500).json({ message: err.message }));

                // Insere Municipios SC
                Estado.findOne({ uf: "SC" })
                .then((sc) => {
                    municipiosSC.forEach(function (municipio) {
                        Municipio.create({ nome: municipio.nome, estado: sc._id });
                    });
                    console.log("Municípios de SC criados com sucesso!");
                }, (err) => next(err))
                .catch(err => res.status(err.status).res.status(500).json({ message: err.message }));

                // Insere Municipios Outro
                Estado.findOne({ uf: "XX" })
                .then((xx) => {
                    municipiosOutro.forEach(function (municipio) {
                        Municipio.create({ nome: municipio.nome, estado: xx._id });
                    });
                    console.log("Municípios de OUTRO criados com sucesso!");
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
            message: "Usuário não autorizado para realizar esta operação!"
        });
    }
});

//limpar_ocorrencias
popularBancoRouter.get("/limpar_ocorrencias", function (req, res) {
    if (req.user.username === "admin") {
        // Limpa o banco
        Ocorrencia.remove({}, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ message: "Todas ocorrências apagadas com sucesso!" });
            }
        });
    } else {
        res.status(403).json({
            message: "Usuário não autorizado para realizar esta operação!"
        });
    }
});

popularBancoRouter.post("/limpar_ocorrencias", function (req, res) {
    var data = new Date(req.body.dataHoraAcionamento);

    if (isNaN(data.getTime())) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "dataHoraAcionamento deve ser informada no formato yyyy-MM-ddThh:mm:ssZ" });
    }
    else{
        if (req.user.username === "admin") {
            // Limpa o banco
            Ocorrencia.remove({ dataHoraAcionamento: {$lt: data} }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ message: "Apagadas ocorrências anteriores a " + req.body.dataHoraAcionamento });
                }
            });
        } else {
            res.status(403).json({
                message: "Usuário não autorizado para realizar esta operação!"
            });
        }
    }
});

//router export
module.exports = popularBancoRouter;