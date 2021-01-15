const bcrypt = require("bcryptjs");
const User = require("../models/Schema");
const AppError = require("../helpers/appError");
const sendErrorMessage = require("../helpers/Error");
const sendResponse = require("../helpers/Response");

const login = async (req, res, next) => {
  console.log("loggedin by", req.currentUser);

  let flag = await bcrypt.compare(req.body.password, req.currentUser.password);
  console.log(flag);
  if (!flag) {
    return sendErrorMessage(
      new AppError(401, "Unsuccessful", "Wrong"),
      req,
      res
    );
  } else {
    sendResponse(200, "Succesfull", req.currentUser, req, res);
  }
};

module.exports.login = login;
