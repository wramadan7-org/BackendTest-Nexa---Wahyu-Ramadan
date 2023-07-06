const CustomError = require("../../config/customError");
const { executeQuery } = require("../../config/database");

const saveToken = async (id, token) => {
  const query = `INSERT INTO admin_token (id_user, token) VALUES (${id}, '${token}')`;

  try {
    const execute = await executeQuery(query);

    return execute;
  } catch (error) {
    throw new CustomError(error, 500);
  }
};

module.exports = {
  saveToken,
};
