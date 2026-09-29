const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const expectedEmail = process.env.HR_EMAIL;
  const expectedPassword = process.env.HR_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!expectedEmail || !expectedPassword || !jwtSecret) {
    return res.status(500).json({
      error: "Authentication is not configured",
    });
  }

  if (
    email !== expectedEmail ||
    password !== expectedPassword
  ) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const user = {
    name: "HR Manager",
    email: expectedEmail,
    role: "HR Manager",
  };

  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    {
      expiresIn: "8h",
    }
  );

  return res.status(200).json({
    user,
    token,
  });
};

module.exports = {
  login,
};