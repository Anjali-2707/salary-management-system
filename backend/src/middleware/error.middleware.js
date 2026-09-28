const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({
      error: "Employee ID or email already exists",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
};

module.exports = {
  errorHandler,
};