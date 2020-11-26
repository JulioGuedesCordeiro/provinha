const AbstractError = require('./AbstractError');

class InternalServerError extends AbstractError {
  constructor(message = 'Erro interno') {
    super(500, message);
  }
}

module.exports = InternalServerError;
