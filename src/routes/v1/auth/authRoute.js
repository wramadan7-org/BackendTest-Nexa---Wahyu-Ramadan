const { Router } = require("express");
const { loginController } = require("../../../controllers/auth/authController");
const validation = require("../../../middlewares/validationMiddleware");
const { loginSchema } = require("../../../validations/auth/authValidationSchema");

const router = Router();

router.post("/login", validation(loginSchema), loginController);

module.exports = router;
