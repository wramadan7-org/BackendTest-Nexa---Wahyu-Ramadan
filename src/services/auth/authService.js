const { executeQuery } = require("../../config/database");

const loginService = async (username, password) => {
  const query = `SELECT * FROM admin WHERE username = '${username}' AND password = '${password}'`;

  try {
    const execute = await executeQuery(query);

    return execute;
  } catch (error) {
    throw `Error service: ${error}`;
  }
};

module.exports = {
  loginService,
};
