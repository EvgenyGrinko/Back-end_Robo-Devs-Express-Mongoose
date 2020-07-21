const mongoose = require("mongoose");

const DeveloperSchema = mongoose.Schema({
  name: {
    type: String,
    max: 255,
    required: [true, "Please, add a name"],
  },
  username: {
    type: String,
    max: 255,
    required: [true, "Please, add a username"],
  },
  email: {
    type: String,
    max: 255,
    required: [true, "Please, add an email"],
  },
  phone: {
    type: String,
    required: [true, "Please, add a phone"],
  },
  // avatar: {
  //   type: String,
  //   // required: [true, "Please, add an avatar image"],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Developer", DeveloperSchema);
