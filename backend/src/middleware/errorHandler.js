function errorHandler(err, req, res, next) {
  // if err object has a statusCode, use that, else default to 500
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  console.error(`[${status}] ${req.method} ${req.originalUrl} - ${message}`);

  res.status(status).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
