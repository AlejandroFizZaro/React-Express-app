const { check } = require("express-validator");
const { validateResult } = require("../middlewares/validators");

const userParamsValidator = [
  check("email").exists().isEmail(),
  check("password").exists().notEmpty(),
  check("active").isBoolean(),
  check("type").exists().notEmpty().equals('admin' || 'teacher'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const signUpParamsValidator = [
  check("email").exists().isEmail(),
  check("password").exists().notEmpty(),
  check("dni").exists().notEmpty(),
  check("name").exists().notEmpty(),
  check("last_name").exists().notEmpty(),
  check("date_of_birth").exists().notEmpty().isDate(),
  check("type").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  userParamsValidator,
  signUpParamsValidator
};
