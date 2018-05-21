const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function (req, res, next) {

  const token = req.headers['x-access-token'];

  if (token) {
    try {
        var decoded = jwt.verify(token, config.secret);

        req.user = decoded;        
        
        return next();
    } catch(err) {
      return res.json('Token inválido');
    }
  } else {
    return res.json('Envie o token');
  }
}
