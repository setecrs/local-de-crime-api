var Ocorrencia = require('../models/ocorrencia');

module.exports = function(app) {

    // Lista todas as ocorrências (NO FUTURO, DEVE SER ALTERADA PRA LISTAR APENAS AS OCORRÊNCIAS DO USUÁRIO LOGADO)
    app.get('/ocorrencia', isLoggedIn, function(req, res) {
        Ocorrencia.find({}, 
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', 
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });
    
    // Busca apenas uma única ocorrência, pelo seu idOcorrencia (NO FUTURO, DEVE SER ALTERADA PRA MOSTRAR APENAS SE A OCORRÊNCIA FOR DO USUÁRIO LOGADO)
    app.get('/ocorrencia/:idOcorrencia', isLoggedIn, function(req, res) {
        Ocorrencia.findById(req.params.idOcorrencia, 
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', 
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });

    // Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
    app.post('/dados_gerais/:idOcorrencia', function(req, res) {
        Ocorrencia.findByIdAndUpdate(req.params.idOcorrencia, 
            {
                numeroOcorrencia: req.body.numeroOcorrencia,
                sedeOcorrencia: req.body.sedeOcorrencia,
                peritoOcorrencia: req.body.peritoOcorrencia,
                dataHoraAcionamento: req.body.dataHoraAcionamento
            }
        );
    });
};
