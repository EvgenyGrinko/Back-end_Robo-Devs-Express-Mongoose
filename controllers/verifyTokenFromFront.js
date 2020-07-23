const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Verify auth token
// @route   POST /api/developers/auth
// @access  Public
exports.verifyToken = async (req, res, next) => {
  const { token } = req.body;
  try {
    await jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err)
        return res
          .status(400)
          .json({ success: false, error: "Token is invalid. Access denied" });
      const foundUser = await User.findById(decoded._id);
      if (!foundUser)
        return res.status(400).json({
          success: false,
          error: "User is not in the database. Access denied",
        });
      res.status(200).json({ success: true, message: "Access allowed" });
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      error: "Server Error",
    });
  }
};
