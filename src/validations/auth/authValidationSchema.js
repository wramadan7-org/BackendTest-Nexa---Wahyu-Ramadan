const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.alphanum":
            err.message = "Username must only contain alphanumeric characters";
            break;
          case "string.min":
            err.message = `Username must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Username cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Username is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "string.alphanum":
            err.message = "Password must only contain alphanumeric characters";
            break;
          case "string.min":
            err.message = `Password must be at least ${err.local.limit} characters long`;
            break;
          case "string.max":
            err.message = `Password cannot exceed ${err.local.limit} characters`;
            break;
          case "any.required":
            err.message = "Password is required";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

module.exports = {
  loginSchema,
};
