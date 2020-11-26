class AbstractError extends Error {
  constructor(statusCode, message) {
    if (new.target === AbstractError) {
      throw new TypeError('A classe abstrata "AbstractError" não pode ser instanciada diretamente.');
    }
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.errorCode = statusCode;
    Error.captureStackTrace(this, this.contructor);
  }
}

module.exports = AbstractError;
