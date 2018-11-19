class popular_banco {

    popularBanco() {
        var Estado = require("../models/estado");
        var Municipio = require("../models/municipio");
        var Sede = require("../models/sede");
        var TipoLocal = require("../models/tipo_local");
        var TipoDelito = require("../models/tipo_delito");
        var TipoVestigio = require("../models/tipo_vestigio");
        var Ocorrencia = require("../models/ocorrencia");

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
            { tipoLocal: "Estrangeiro" },
            { tipoLocal: "Instituto Federal" },
            { tipoLocal: "Universidade Federal" },
            { tipoLocal: "Outro" }
        ];

        var tiposDelito = [
            { tipoDelito: "Arrombamento sem furto" },
            { tipoDelito: "Dano" },
            { tipoDelito: "Drogas" },
            { tipoDelito: "Falsidade ideológica" },
            { tipoDelito: "Furto com arrombamento" },
            { tipoDelito: "Furto sem arrombamento" },
            { tipoDelito: "Moeda falsa" },
            { tipoDelito: "Não houve crime" },
            { tipoDelito: "Roubo" },
            { tipoDelito: "À mão armada" },
            { tipoDelito: "Buraco na parede" },
            { tipoDelito: "Chave mixa" },
            { tipoDelito: "Chupa-cabra" },
            { tipoDelito: "Com violência" },
            { tipoDelito: "Explosivos" },
            { tipoDelito: "Forçar porta ou janela (sem quebrar vidro)" },
            { tipoDelito: "Furto de câmera ou monitor" },
            { tipoDelito: "Furto de pequeno valor" },
            { tipoDelito: "Furto por descuido" },
            { tipoDelito: "Levar o cofre inteiro" },
            { tipoDelito: "Maçarico" },
            { tipoDelito: "Não houve dano ou dano mínimo" },
            { tipoDelito: "Nomes e dados divergentes no AFIS-PF" },
            { tipoDelito: "Pé de cabra" },
            { tipoDelito: "Provável organização criminosa" },
            { tipoDelito: "Quebrou vidro" }
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

        // Insere tipos de Vestigio
        TipoVestigio.create(tiposVestigio, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Tipos de Vestígio criados com sucesso")
            }
        });


        //cria administrador e loga a senha no console
        const register = require('../config/register');
        
        //Gera a senha aleatoria com 6 caracteres
        var tamanho = 6;
        var letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        var password = '';
        for (var i = 0; i < tamanho; i++) {
            var rnum = Math.floor(Math.random() * letras.length);
            password += letras.substring(rnum, rnum + 1);
        }

        register.registerUser("Administrador", "admin", password, null).then(result => {
            console.log(result.status);
            
            console.log("-------- ADMINISTRADOR -----------");
            console.log("# username: admin");
            console.log("# password: "+password);
            console.log("-------- ADMINISTRADOR -----------");
		}).catch(err => console.log(err));

    }

}

module.exports = popular_banco;