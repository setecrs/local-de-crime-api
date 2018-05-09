const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function (req) {

  const token = req.headers['x-access-token'];

  if (token) {
    try {
        var decoded = jwt.verify(token, config.secret);

        return decoded;
    } catch(err) {
      return false;
    }
  } else {
    return false;
  }
}
