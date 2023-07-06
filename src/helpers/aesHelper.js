require("dotenv").config();
const CryptoJs = require("crypto-js");
const CustomError = require("../config/customError");

const { AES_SECRET } = process.env;

const encryptAES = async (data) => {
  try {
    const encrypted = await CryptoJs.AES.encrypt(
      JSON.stringify(data),
      AES_SECRET
    ).toString();

    return encrypted;
  } catch (error) {
    throw new CustomError(error, 409);
  }
};

const decryptAES = async (encrypt) => {
  try {
    const bytes = await CryptoJs.AES.decrypt(encrypt, AES_SECRET);
    const decrypt = await bytes.toString(CryptoJs.enc.Utf8);

    return decrypt;
  } catch (error) {
    throw new CustomError(error, 409);
  }
};

module.exports = {
  encryptAES,
  decryptAES,
};
