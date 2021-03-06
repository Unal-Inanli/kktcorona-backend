const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../modules/auth");
const { DataAccess } = require("../../classes/DataAccess");
const Listing = require("../../db/models/Listing");

let dataAccess = new DataAccess();

router.get("/", ensureAuthenticated, async (req, res) => {
  var result = await dataAccess.getCollection(Listing);
  if (result === false) {
    res.sendStatus(409);
  } else {
    res.send(result);
  }
});

module.exports = router;
