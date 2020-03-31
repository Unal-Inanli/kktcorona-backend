const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../modules/auth");
const { DataAccess } = require("../../classes/DataAccess");
const User = require("../../db/models/User");

let dataAccess = new DataAccess();

router.get("/chatBubbles", async (req, res) => {
  let result = await dataAccess.getCollection(User);

  var arr = [];

  result.forEach(element => {
    var model = {
      id: element._id,
      Name: `${element.userProfile.FirstName} ${element.userProfile.LastName}`
    };
    arr.push(model);
  });
  if (result === false) {
    res.status(409);
  }
  res.send(arr);
});

module.exports = router;
