const AbstractError = require('./AbstractError');

class BadRequest extends AbstractError {
  constructor(message = 'Informações Invalidas') {
    super(400, message);
  }
}

module.exports = BadRequest;
