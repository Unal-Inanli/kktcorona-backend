const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const Listing = new Schema({
  id: ObjectID,
  title: String,
  body: String,
  createdAt: Date,
  madeBy: {
    userId: String,
    username: String
  }
});

module.exports = mongoose.model("Listing", Listing, "listings");
