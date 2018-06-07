const mongoose = require('mongoose');

module.exports = { 
    ObjectIdIsValid: function(req, res, next) {
        if (mongoose.Types.ObjectId.isValid(req.params.idOcorrencia)) {
            return next();
        } else {
            return res.json('Id da ocorrência inválido.')
        }
    }
}