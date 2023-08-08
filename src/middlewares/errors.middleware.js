const {
  ValidationError,
  DatabaseError,
  ConnectionError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  InvalidConnectionError,
} = require("sequelize");

// middleware para loggear errores

const logError = (err, req, res, next) => {
  console.log(err);
  next(err);
};

// middleware para gestionar los errores de ORM
const handleORMError = (err, req, res, next) => {
  if (
    err instanceof ConnectionError ||
    err instanceof ConnectionRefusedError ||
    err instanceof ConnectionTimedOutError ||
    err instanceof InvalidConnectionError
  ) {
    return res.status(409).json({
      error: "database connection error",
      message: err.name,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      name: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(409).json({
      name: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  next(err);
};

// middleware de error general

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.errorName,
    message: err.error,
  });
};

// not found handler

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Not found",
    message:
      "El backend anda lento y no tiene esta ruta por ahora, vuelva más tarde",
  });
};

module.exports = {
  logError,
  handleORMError,
  errorHandler,
  notFoundErrorHandler,
};
