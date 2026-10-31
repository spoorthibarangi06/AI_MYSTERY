export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`,
    error: 'NOT_FOUND',
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error('[Error]', err.stack || err.message);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'An unexpected internal error occurred',
    error: err.code || 'SERVER_ERROR',
  });
};
