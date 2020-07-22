const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  addDeveloper,
  deleteDeveloper,
  editDeveloper,
} = require("../controllers/developers");
const verify = require("../controllers/verifyToken");

router.route("/").get(verify, getDevelopers).post(verify, addDeveloper);

router
  .route("/:id")
  .get(verify, getDeveloper)
  .delete(verify, deleteDeveloper)
  .patch(verify, editDeveloper);

module.exports = router;
