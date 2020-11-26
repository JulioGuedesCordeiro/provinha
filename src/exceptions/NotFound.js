const AbstractError = require('./AbstractError');

class NotFound extends AbstractError {
  constructor(message = 'Recurso não encontrado') {
    super(404, message);
  }
}

module.exports = NotFound;
