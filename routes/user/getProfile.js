const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../modules/auth");
const { DataAccess } = require("../../classes/DataAccess");

let dataAccess = new DataAccess();

router.get("/getProfile", ensureAuthenticated, async (req, res) => {
  const { user } = req;
  let result = await dataAccess.getProfile(user._id);
  res.send(result);
});

module.exports = router;
