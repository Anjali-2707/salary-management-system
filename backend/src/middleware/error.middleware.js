const errorHandler = (error, req, res, next) => {
  if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({
      error: "Employee ID or email already exists",
    });
  }

  console.error(error);

  return res.status(500).json({
    error: "Internal server error",
  });
};

module.exports = {
  errorHandler,
};
