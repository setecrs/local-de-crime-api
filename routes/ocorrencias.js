
isLoggedIn = require("./is_logged_in.js");

module.exports = function(app) {

    //app.use(login.isLoggedIn); // Função middleware para verificar se o perito está logado, é chamado para todas as funções abaixo

    // Lista todas as ocorrências (NO FUTURO, DEVE SER ALTERADA PRA LISTAR APENAS AS OCORRÊNCIAS DO USUÁRIO LOGADO)
    app.get('/ocorrencia', function(req, res) {
        Ocorrencia.find({}, // Foi passado um objeto vazio como filtro, pois queremos todas as ocorrências
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', // select implicito: campos que queremos filtrar
            function (err, ocorrencia) {
                if (err) return err;
            
                console.log("req.user: " + req.user);
                res.json(ocorrencia);
        });
    });

    // Cria uma nova ocorrência
    app.post('/ocorrencia', function(req, res) {
        Ocorrencia.create({}, // os campos que não forem passado receberão o valor padrão, definido no seu Model
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });

    // Busca apenas uma única ocorrência, pelo seu idOcorrencia (NO FUTURO, DEVE SER ALTERADA PRA MOSTRAR APENAS SE A OCORRÊNCIA FOR DO USUÁRIO LOGADO)
    app.get('/ocorrencia/:idOcorrencia', function(req, res) {
        Ocorrencia.findById(req.params.idOcorrencia, // idOcorrencia que foi passado na URL
            'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento', // select implicito: campos que queremos filtrar
            function (err, ocorrencia) {
                if (err) return err;
            
                res.json(ocorrencia);
        });
    });

    // Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
    app.patch('/dados_gerais/:idOcorrencia', function(req, res) {
        Ocorrencia.findByIdAndUpdate(req.params.idOcorrencia, // idOcorrencia que foi passado na URL
            {
                numeroOcorrencia: req.body.numeroOcorrencia,      // campos que queremos atualizar,
                sedeOcorrencia: req.body.sedeOcorrencia,          // como estamos utilizando o método HTTP PATCH
                peritoOcorrencia: req.body.peritoOcorrencia,      // os campos que não forem recebidos
                dataHoraAcionamento: req.body.dataHoraAcionamento // NÃO serão atualizados
            }, { 
                new: true, // true para retornar o objeto atualizado
                select: 'numeroOcorrencia sedeOcorrencia peritoOcorrencia dataHoraAcionamento' // campos que queremos filtrar
            }, function (err, ocorrencia) {
                if (err) res.status(500).json(err);
            
                res.json(ocorrencia);
            }
        );
    });
};
