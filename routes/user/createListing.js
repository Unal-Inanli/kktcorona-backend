const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../modules/auth");
const { UserManager } = require("../../classes/UserManager");
const { DataAccess } = require("../../classes/DataAccess");
const Listing = require("../../db/models/Listing");

let userManager = new UserManager();
let dataAccess = new DataAccess();

router.post("/createListing", ensureAuthenticated, async (req, res) => {
  const { user } = req;
  const { title, body } = req.body;
  let data = {
    title,
    body,
    createdAt: Date.now(),
    madeBy: {
      userId: user._id.toString(),
      username: user.username
    }
  };
  var result = await dataAccess.addRecord(data, Listing);

  if (result === true) {
    res.sendStatus(201);
  } else {
    res.sendStatus(409);
  }
});

module.exports = router;
