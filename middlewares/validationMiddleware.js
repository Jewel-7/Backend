const bcrypt = require("bcryptjs");
const User = require("../models/Schema");
const sendErrorMessage = require("../helpers/Error");
const AppError = require("../helpers/appError");

const checkRequestBody = (req, res, next) => {
  let validationArray = [];
  switch (req.url) {
    case "/login":
      validationArray = ["email", "password"];
      break;
    case "/signup":
      validationArray = ["name", "email", "password", "confirmPassword"];
      break;
  }
  next();
};

const isEmailValid = (req, res, next) => {
  next();
};

const checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorMessage(
      new AppError(
        400,
        "Unsuccessful",
        "Confirm password & password do not match."
      ),
      req,
      res
    );
  }
  next();
};

const createPasswordHash = async (req, res, next) => {
  try {
    let salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (err) {
    return sendErrorMessage(
      new AppError(400, "Unsuccessful", "Internal Server Error"),
      req,
      res
    );
  }
};

const ifUserExist = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      req.currentUser = user;
      if (!user) {
        return sendErrorMessage(
          new AppError(400, "Unsuccessful", "User not Registered"),
          req,
          res
        );
      }
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.checkRequestBody = checkRequestBody;
module.exports.isEmailValid = isEmailValid;
module.exports.checkConfirmPassword = checkConfirmPassword;
module.exports.createPasswordHash = createPasswordHash;
module.exports.ifUserExist = ifUserExist;
