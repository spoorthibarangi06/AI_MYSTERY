export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return res.status(400).json({
        success: false,
        message: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Validation error',
        error: 'VALIDATION_FAILED',
      });
    }
    req.validatedBody = parsed.data;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      error: 'VALIDATION_ERROR',
    });
  }
};
