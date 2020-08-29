require("express-async-errors");
const { validationResult } = require("express-validator");
const CustomError = require("../helpers/customErrors");
module.exports = (...validationChecks) => async (req, res, next) => {
  console.log(req.body);
  await Promise.all(
    validationChecks.map((validationCheck) => validationCheck.run(req))
  );
  const { errors } = validationResult(req);
  if (!errors.length) {
    return next();
  }
  throw CustomError("validator Error", 422, errors);
};
