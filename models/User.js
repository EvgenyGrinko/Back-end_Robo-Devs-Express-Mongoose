const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    max: 255,
    required: [true, "Please, add a name"],
  },
  email: {
    type: String,
    max: 255,
    required: [true, "Please, add an email"],
  },
  password: {
    type: String,
    required: [true, "Please, enter the password"],
    max: 1024,
    min: 6
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
