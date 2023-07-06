require("dotenv").config();
const CryptoJs = require("crypto-js");
const CustomError = require("../config/customError");
const httpStatus = require("http-status");

const { AES_SECRET } = process.env;

const encryptAES = (data) => {
  try {
    const encrypted = CryptoJs.AES.encrypt(
      JSON.stringify(data),
      AES_SECRET
    ).toString();

    return encrypted;
  } catch (error) {
    throw new CustomError(error, httpStatus.CONFLICT);
  }
};

module.exports = {
  encryptAES,
};
