const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  addDeveloper,
  deleteDeveloper,
  editDeveloper,
} = require("../controllers/developers");
const {verifyToken} = require('../controllers/verifyTokenFromFront')
const verify = require("../controllers/verifyToken");

router.route("/").get(getDevelopers).post(addDeveloper);

router
  .route("/:id")
  .get(getDeveloper)
  .delete(deleteDeveloper)
  .patch(editDeveloper);

router.route("/auth").post(verifyToken);

module.exports = router;
