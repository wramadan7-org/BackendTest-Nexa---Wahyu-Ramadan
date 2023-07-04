const CustomError = require("../../config/customError");
const { executeQuery } = require("../../config/database");

const loginService = async (username) => {
  const query = `SELECT * FROM admin WHERE username = '${username}'`;

  try {
    const execute = await executeQuery(query);

    return execute;
  } catch (error) {
    throw new CustomError(error, 500)
  }
};

module.exports = {
  loginService,
};
