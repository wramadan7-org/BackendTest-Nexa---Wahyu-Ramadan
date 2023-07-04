require("dotenv").config();
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { loginService } = require("../../services/auth/authService");
const { compared } = require("../../helpers/bcryptHelper");
const CustomError = require("../../config/customError");

const { JWT_SECRET } = process.env;

const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Get data admin by username
    const validUsername = await loginService(username);
    // Check valid username
    if (!validUsername || !validUsername.length)
      return res.sendWrapped("Username incorrect", httpStatus.UNAUTHORIZED);
    // Compare password from db with request
    const validPassword = await compared(password, validUsername[0].password);
    // Check password match
    if (!validPassword)
      return res.sendWrapped("Password incorrect", httpStatus.UNAUTHORIZED);

    const response = {
      token: "TOKEN",
    };

    res.sendWrapped("Login successfully", httpStatus.OK, response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};
