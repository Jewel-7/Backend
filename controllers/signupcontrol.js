const User = require("../models/Schema");
const AppError = require("../helpers/appError");
const sendErrorMessage = require("../helpers/Error");
const sendResponse = require("../helpers/Response");

const signup = async (req, res, next) => {
  try {
    let data = req.body;
    console.log(data);
    let newEntry = {};
    newEntry.name = data.name.trim();
    newEntry.email = data.email.trim();
    newEntry.password = data.password.trim();
    newEntry.confirmPassword = data.confirmPassword.trim();

    let user = await User.find({ email: newEntry.email });
    if (user.length) {
      return sendErrorMessage(
        new AppError(400, "Unsuccessful", "This email is used"),
        req,
        res
      );
    } else {
      let data = await User.create(newEntry);
      sendResponse(200, "Succesfull", data, req, res);
    }
  } catch (err) {
    console.log(err);
    return sendErrorMessage(new AppError(400, "unsuccessful", err), req, res);
  }
};

module.exports.signup = signup;
