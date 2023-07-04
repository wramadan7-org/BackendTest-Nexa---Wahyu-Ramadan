const bcrypt = require("bcrypt");
const CustomError = require("../config/customError");

const bcrypted = async (password, salt) => {
  try {
    const bcrypting = await bcrypt.hash(password, salt);

    return bcrypting;
  } catch (error) {
    throw new CustomError(error, 400);
  }
};

const compared = async (password, encryptPassword) => {
  try {
    const comparing = await bcrypt.compare(password, encryptPassword);

    return comparing;
  } catch (error) {
    throw new CustomError(error, 500)
  }
};

module.exports = {
  bcrypted,
  compared,
};
