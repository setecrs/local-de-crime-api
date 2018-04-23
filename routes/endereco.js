var Ocorrencia = require('../models/ocorrencia');
isLoggedIn = require("./../app/is_logged_in.js");

module.exports = function(app) {

    app.get('/endereco', function(req, res) {
        Ocorrencia.find({ idOcorrencia: req.body.idOcorrencia }, 'local estado municipio logradouro complemento', function (err, ocorrencia) {
            if (err) return err;
            
            res.json(ocorrencia);
        });
    });
    
    app.post('/dados-gerais', function(req, res) {
        var ocorrencia = new Ocorrencia ({
            local: req.body.local,
            estado: req.body.estado,
            municipio: req.body.municipio,
            logradouro: req.body.logradouro,
            complemento: req.body.complemento
        });

        ocorrencia.save();

        res.json(ocorrencia);
    });
};