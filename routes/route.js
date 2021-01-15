const express = require("express");
const { signup } = require("../controllers/signupcontrol");
const { login } = require("../controllers/logincontrol");

const {
  checkRequestBody,
  isEmailValid,
  createPasswordHash,
  checkConfirmPassword,
  ifUserExist,
} = require("../middlewares/validationMiddleware");

const routes = express.Router();
routes
  .route("/signup")
  .post(
    checkRequestBody,
    isEmailValid,
    checkConfirmPassword,
    createPasswordHash,
    signup
  );
routes.route("/login").post(checkRequestBody, ifUserExist, login);

module.exports = routes;
