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
      return res.status(401).json({message: 'Token inválido!'});
    }
  } else {
    return res.status(401).json({message: 'Envie o token!'});
  }
}
