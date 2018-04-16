var Ocorrencia = require('../models/ocorrencia');

module.exports = function(app) {

    app.get('/dados-gerais', function(req, res) {
        Ocorrencia.find({ idOcorrencia: req.body.idOcorrencia }, 'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', function (err, ocorrencia) {
            if (err) return err;
            
            res.json(ocorrencia);
        });
    });
    
    app.post('/dados-gerais', function(req, res) {
        var ocorrencia = new Ocorrencia ({
            numeroOcorrencia: req.body.numeroOcorrencia,
            sedeOcorrencia: req.body.sedeOcorrencia,
            peritoOcorrencia: req.body.peritoOcorrencia,
            dataHoraAcionamento: req.body.dataHoraAcionamento
        });

        ocorrencia.save();

        res.json(ocorrencia);
    });
};