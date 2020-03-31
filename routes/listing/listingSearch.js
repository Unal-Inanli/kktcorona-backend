const express = require("express");
const router = express.Router();
const { DataAccess } = require("../../classes/DataAccess");
const Listing = require("../../db/models/Listing");

let dataAccess = new DataAccess();

router.post("/search", async (req, res) => {
  var result = await dataAccess.searchCollection(req.body.query, Listing);
  if (result === false) {
    res.sendStatus(409);
  } else {
    res.send(result);
  }
});

module.exports = router;
