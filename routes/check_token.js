const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = function (req) {

  const token = req.headers['x-access-token'];

  if (token) {
    try {
        var decoded = jwt.verify(token, config.secret);

        return decoded.message;
    } catch(err) {
      return false;
    }
  } else {
    return false;
  }
}
