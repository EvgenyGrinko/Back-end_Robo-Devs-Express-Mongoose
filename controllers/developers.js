const Developer = require("../models/Developer");
const axios = require("axios");
const { addEditValidation } = require("../validation/validations");

// @desc    Get all developers
// @route   GET /api/developers
// @access  Public
exports.getDevelopers = async (req, res, next) => {
  try {
    const isNotDBEmpty = await Developer.count({}, (err) => {});
    const devs = [];
    if (!isNotDBEmpty) {
      const url = "https://jsonplaceholder.typicode.com/users";
      const { data } = await axios.get(url);
      data.forEach((item, index) => {
        const devWithAvatar = {
          ...item,
          avatar: "https://robohash.org/" + index,
        };
        devs.push(devWithAvatar);
      });
      await Developer.insertMany(devs, (err) => {
        console.log(err);
      });
    }
    const developers = await Developer.find();
    return res.status(200).json({
      success: true,
      count: developers.length,
      developers: developers,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
      error: "Server Error",
    });
  }
};

// @desc    Get developer
// @route   GET /api/developers/:id
// @access  Public
exports.getDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id); //req.params.id to get access to ":id"
    if (!developer) {
      return res.status(404).json({
        success: false,
        error: "No developer found",
      });
    }
    return res.status(200).json({
      success: true,
      developer: developer,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add developer
// @route   POST /api/developers
// @access  Public
exports.addDeveloper = async (req, res, next) => {
  try {
    const { error } = addEditValidation(req.body);
    if (error) {
      return res
        .status(403)
        .json({ success: false, error: error.details[0].message });
    }
    const developerData = req.body;
    //if an avatar for developer is not provided, add default randomly
    if (!developerData.avatar)
      developerData.avatar = `https://robohash.org/${Math.random()}`;

    const foundDeveloper = await Developer.findOne({
      email: developerData.email,
    });
    if (foundDeveloper)
      res.status(400).json({
        success: false,
        error: "Developer with this email already exists",
        isDeveloperEmailAlreadyExists: true,
      });
    const developer = await Developer.create(developerData);
    return res.status(201).json({
      success: true,
      developer: developer,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
        body: req.body,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete developer
// @route   DELETE /api/developers/:id
// @access  Public
exports.deleteDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id); //req.params.id to get access to ":id"
    if (!developer) {
      return res.status(404).json({
        success: false,
        error: "No developer found",
      });
    }
    await developer.remove();
    // await Developer.deleteMany({}, (err)=>{});
    const developers = await Developer.find();
    return res.status(200).json({
      success: true,
      developers: developers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Edit developer
// @route   PATCH /api/developers/:id
// @access  Public
exports.editDeveloper = async (req, res, next) => {
  try {
    const developer = await Developer.findById(req.params.id); //req.params.id to get access to ":id"
    if (!developer) {
      return res.status(404).json({
        success: false,
        error: "No developer found",
      });
    }
    const { error } = addEditValidation(req.body);
    if (error) {
      return res
        .status(403)
        .json({ success: false, error: error.details[0].message });
    }
    await Developer.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({
      success: true,
      developer: req.body,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
