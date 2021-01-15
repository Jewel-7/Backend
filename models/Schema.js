const mongoose = require("mongoose");
const uniquid = require("uniquid");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uniquid(),
  },
  name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email. "],
    unique: [true, "Email Id already exist. Try with another Email Id. "],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});
let User = mongoose.model("Trail", userSchema);
module.exports = User;
