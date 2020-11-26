const AbstractError = require('./AbstractError');

class Forbidden extends AbstractError {
  constructor(message = 'Proibido') {
    super(403, message);
  }
}

module.exports = Forbidden;
