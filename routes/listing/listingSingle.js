const express = require("express");
const router = express.Router();
const { DataAccess } = require("../../classes/DataAccess");
const Listing = require("../../db/models/Listing");

let dataAccess = new DataAccess();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  var result = await dataAccess.getSingle({ _id: id }, Listing);

  if (result === false) {
    res.sendStatus(409);
  } else {
    res.send(result);
  }
});

module.exports = router;
