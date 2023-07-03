const { Router } = require("express");
const { loginController } = require("../../../controllers/auth/authController");

const router = Router();

router.post("/login", loginController);

module.exports = router;
