const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validations");

// @desc    Register new user
// @route   POST /api/user
// @access  Public
exports.registerUser = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  const { name, email, password } = req.body;

  if (error) {
    return res
      .status(403)
      .json({ success: false, error: error.details[0].message });
  }
  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .json({ success: false, error: "Email already exists" });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //Create a new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      user: savedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      error: "Server Error",
    });
  }
};

// @desc    Login user
// @route   POST /api/user
// @access  Public
exports.loginUser = (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res
      .status(403)
      .json({ success: false, error: error.details[0].message });
  }
  try {
  } catch (err) {}
};
