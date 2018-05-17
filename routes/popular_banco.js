var Estado = require('../models/estado');
const checkToken = require('../config/check_token');

//popularBancoRouter
var express = require('express');
var popularBancoRouter = express.Router();

//default
popularBancoRouter.get('/default', function (req, res) {
    if (user = checkToken(req)) {
        if (user.username == "admin") {
            // Estados
            Estado.create([
                { nome: "Rio Grande do Sul", uf: "RS" },
                { nome: "Santa Catarina", uf: "SC" }
            ])
            .then((estados) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(estados);
            }, (err) => next(err))
            .catch(err => res.status(err.status).json({ message: err.message }));
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

popularBancoRouter.delete('/default', function (req, res) {
    if (user = checkToken(req)) {
        if (user.username == "admin") {
            // Estados
            Estado.remove({})
            .then((estados) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(estados);
            }, (err) => next(err))
            .catch(err => res.status(err.status).json({ message: err.message }));
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