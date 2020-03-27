const express = require("express");
const router = express.Router();
const { UserManager } = require("../classes/UserManager");
const { DataAccess } = require("../classes/DataAccess");

var userManager = new UserManager();
var dataAccess = new DataAccess();

router.post("/register", async (req, res) => {
  let user = await dataAccess.findOne({ username: req.body.username }, "users");
  let data = {
    username: req.body.username.toLowerCase(),
    password: req.body.password,
    isVolunteer: req.body.isVolunteer
  };
  if (user === null) {
    await userManager.RegisterUser(data);
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

module.exports = router;
