var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../config/check_token');

//dadosGeraisRouter
const express = require('express');
const dadosGeraisRouter = express.Router();

//patch
// Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
// param idOcorrencia: _id da Ocorrencia que queremos atualizar
dadosGeraisRouter.patch('/:idOcorrencia', function(req, res) {
    if (user = checkToken(req)) {
        Ocorrencia.findOneAndUpdate({
                _id: req.params.idOcorrencia,
                criadoPor: user.id
            }, // idOcorrencia que foi passado na URL
            {
                numeroOcorrencia: req.body.numeroOcorrencia, // campos que queremos atualizar,
                sede: req.body.sede, // como estamos utilizando o método HTTP PATCH
                peritos: req.body.peritos, // os campos que não forem recebidos
                dataHoraAcionamento: req.body.dataHoraAcionamento // NÃO serão atualizados
            }, {
                new: true, // true para retornar o objeto atualizado
                select: 'numeroOcorrencia sede peritosAcionados dataHoraAcionamento' // campos que queremos filtrar
            },
            function(err, ocorrencia) {
                if (err) res.status(500).json(err);

                res.json(ocorrencia);
            }
        );

    } else {
        res.status(401).json({
            message: 'Token inválido'
        });
    };

});

//router export
module.exports = dadosGeraisRouter;