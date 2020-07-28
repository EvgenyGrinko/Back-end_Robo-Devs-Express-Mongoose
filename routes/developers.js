const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  addDeveloper,
  deleteDeveloper,
  editDeveloper,
  findDevelopers,
} = require("../controllers/developers");
const { verifyToken } = require("../controllers/verifyTokenFromFront");
const verify = require("../controllers/verifyToken");

router.route("/search").get(findDevelopers);

router.route("/").get(getDevelopers).post(addDeveloper);

router
  .route("/:id")
  .get(getDeveloper)
  .delete(deleteDeveloper)
  .patch(editDeveloper);

router.route("/auth").post(verifyToken);

module.exports = router;
