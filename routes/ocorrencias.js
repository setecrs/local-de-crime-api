var Ocorrencia = require('../models/ocorrencia');
const checkToken = require('../routes/check_token');

module.exports = function(app) {

    // Lista todas as ocorrências
    app.get('/ocorrencia', function(req, res) {
        if (user = checkToken(req)) {

            Ocorrencia.find({
                    criadoPor: user._id
                }) // Foi passado o id do perito como filtro, pois queremos apenas as ocorrências dele
                // .select('numeroOcorrencia sede peritosAcionados dataHoraAcionamento tipoLocal estado municipio') // select: campos que queremos filtrar
                .populate('criadoPor', 'nome sede usuario') // Retorna o Objeto dos campos referenciados para outros documentos (similar ao join)
                .exec(function(err, ocorrencia) {
                    if (err) return err;

                    res.json(ocorrencia);
                });
        } else {
            res.status(401).json({
                message: 'Token inválido'
            });
        };
    });

    // Cria uma nova ocorrência
    app.post('/ocorrencia', function(req, res) {
        if (user = checkToken(req)) {

            Ocorrencia.create({
                    criadoPor: user._id
                }, // os campos que não forem passado receberão o valor padrão, definido no seu Model
                function(err, ocorrencia) {
                    if (err) return err;

                    res.json(ocorrencia);
                }
            );
        } else {
            res.status(401).json({
                message: 'Token inválido'
            });
        };
    });

    // Busca apenas uma única ocorrência, pelo seu idOcorrencia e pelo id do perito logado
    // param idOcorrencia: _id da Ocorrencia que queremos atualizar
    app.get('/ocorrencia/:idOcorrencia', function(req, res) {
        if (user = checkToken(req)) {
            Ocorrencia.findOne({
                    _id: req.params.idOcorrencia,
                    criadoPor: user._id
                }, // idOcorrencia que foi passado na URL
                'numeroOcorrencia sede peritosAcionados dataHoraAcionamento', // select implícito: campos que queremos filtrar
                function(err, ocorrencia) {
                    if (err) return err;

                    res.json(ocorrencia);
                });
        } else {
            res.status(401).json({
                message: 'Token inválido'
            });
        };
    });

    // Salva as alterações, da tela de dados gerais, pelo seu idOcorrencia
    // param idOcorrencia: _id da Ocorrencia que queremos atualizar
    app.patch('/dados_gerais/:idOcorrencia', function(req, res) {
        if (user = checkToken(req)) {
            Ocorrencia.findOneAndUpdate({
                    _id: req.params.idOcorrencia,
                    criadoPor: user._id
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

    // Salva as alterações da tela de endereço
    // param idOcorrencia: _id da Ocorrencia que queremos atualizar
    app.patch('/endereco/:idOcorrencia', function(req, res) {
        if (user = checkToken(req)) {
            Ocorrencia.findOneAndUpdate({
                _id: req.params.idOcorrencia,
                criadoPor: user._id
            }, {
                tipoLocal: req.body.tipoLocal,
                estado: req.body.estado,
                municipio: req.body.municipio,
                logradouro: req.body.logradouro,
                complemento: req.body.complemento
            }, {
                new: true,
                select: 'tipoLocal estado municipio logradouro complemento'
            }, function(err, ocorrencia) {
                if (err) res.status(500).json(err);

                res.json(ocorrencia);
            });
        } else {
            res.status(401).json({
                message: 'Token inválido'
            });
        };
    });
};
