var Ocorrencia = require('../models/ocorrencia');

module.exports = function(app) {

    app.get('/dados-gerais', function(req, res) {
        var ocorrencia = Ocorrencia.find();
        var lista = new Array;

        // for(var i = 0; ocorrencia.length; i++) {
        //     lista[i] = ocorrencia[i];
        // }

        console.log(ocorrencia);
        res.json(ocorrencia);
        
        // res.json(ocorrencia);
    });
    
    app.post('/dados-gerais', function(req, res) {
        var ocorrencia = new Ocorrencia ({
            idOcorrencia: req.body.nome 
        });

        ocorrencia.save();

        res.json(ocorrencia);
        // res.json('Nome da ocorrencia: ' + req.body.nome);        
    });
};