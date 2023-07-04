class CustomError extends Error {
  statusCode;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'CustomError';
  }
}

module.exports = CustomError;