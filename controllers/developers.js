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

// @desc    Get few developers
// @route   GET /api/developers/few/?number=example
// @access  Public
exports.getFewDevelopers = async (req, res, next) => {
  try {
    const { number } = req.query;
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
        res.status(400).json({
          success: false,
          error: err,
          message: `Can't insert developers to the DB`,
        });
      });
    }
    const developers = await Developer.find();
    const fewDevelopers = developers.slice(0, number);
    return res.status(200).json({
      success: true,
      count: fewDevelopers.length,
      developers: fewDevelopers,
    });
  } catch (err) {
    return res.status(500).json({
      success: "false",
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
    const edittedDeveloper = req.body;
    const { error } = addEditValidation(edittedDeveloper);
    if (error) {
      return res
        .status(403)
        .json({ success: false, error: error.details[0].message });
    }
    //Check, if the editted email already exists in the db
    const foundDeveloper = await Developer.findOne({
      email: edittedDeveloper.email,
    });
    if (foundDeveloper && foundDeveloper.email !== developer.email)
      return res
        .status(400)
        .json({ success: false, error: `This email already exists` });
    await Developer.updateOne({ _id: req.params.id }, edittedDeveloper);
    return res.status(200).json({
      success: true,
      developer: edittedDeveloper,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Find developers
// @route   GET /api/developers/search/?query=example
// @access  Public
exports.findDevelopers = async (req, res, next) => {
  try {
    const query = req.query.query;
    // if (!query) return res.status(401).json({ message: "No query" });
    // const foundDevelopers = await Developer.find({
    //   $text: { $search: `\"${query}\"` },
    // });
    const developers = await Developer.find();
    const foundDevelopers = developers.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    return res.status(200).json({
      success: true,
      length: foundDevelopers.length,
      developers: foundDevelopers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      here: "here",
      error: "Server Error",
    });
  }
};
