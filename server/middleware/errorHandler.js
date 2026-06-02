function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// Centralized error handler. Express identifies it by the 4-arg signature.
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('[error]', err);

  if (err?.name === 'ValidationError') {
    const errors = {};
    for (const [field, e] of Object.entries(err.errors || {})) {
      errors[field] = e.message;
    }
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors,
    });
  }

  if (err?.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for "${err.path}".`,
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong on the server.',
  });
}

module.exports = { notFound, errorHandler };
