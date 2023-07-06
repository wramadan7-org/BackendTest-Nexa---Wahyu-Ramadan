require("dotenv").config();
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const { loginService } = require("../../services/auth/authService");
const { compared } = require("../../helpers/bcryptHelper");
const { encryptAES } = require("../../helpers/aesHelper");
const CustomError = require("../../config/customError");
const { saveToken } = require("../../services/admin/adminService");

const { JWT_SECRET, AES_SECRET } = process.env;

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

    const dataEncrypt = {
      id: validUsername[0].id,
      username,
      password,
    };

    const encrypted = await encryptAES(dataEncrypt);

    const token = jwt.sign({ payload: encrypted }, JWT_SECRET);

    await saveToken(validUsername[0].id, token);

    const response = {
      token: token,
    };

    res.sendWrapped("Login successfully", httpStatus.OK, response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};
