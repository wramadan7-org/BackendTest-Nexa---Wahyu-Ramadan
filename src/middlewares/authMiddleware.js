require("dotenv").config();
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const CustomError = require("../config/customError");

const { JWT_SECRET } = process.env;

const authenticationToken = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.sendWrapped("Forbidden access", httpStatus.FORBIDDEN);
      return;
    }

    const token = authorization.slice(7, authorization.length);

    const decode = jwt.verify(token, JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    throw new CustomError(error, 500);
  }
};

module.exports = authenticationToken;
