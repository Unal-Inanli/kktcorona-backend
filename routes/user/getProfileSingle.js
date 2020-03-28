const express = require("express");
const router = express.Router();
const User = require("../../db/models/User");

const { DataAccess } = require("../../classes/DataAccess");

let dataAccess = new DataAccess();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let result = await dataAccess.getSingle({ _id: id }, User);
  res.send(result.userProfile);
});

module.exports = router;
