const httpStatus = require("http-status");
const { loginService } = require("../../services/auth/authService");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginService(username, password);

    res.send({
      status: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error,
    });
  }
};

module.exports = {
  loginController,
};
