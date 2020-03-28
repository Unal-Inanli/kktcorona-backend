const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../modules/auth");
const { UserManager } = require("../../classes/UserManager");

let userManager = new UserManager();

router.post("/setProfile", ensureAuthenticated, async (req, res) => {
  const { id, firstName, lastName, Bio } = req.body;
  const data = {
    FirstName: firstName,
    LastName: lastName,
    Bio
  };

  let result = await userManager.setProfile(id, data);
  const { _id, hasProfile, username, isVolunteer } = result;
  let response = {
    id: _id,
    hasProfile,
    username,
    isVolunteer
  };
  res.send(response);
});

module.exports = router;
