const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../db/models/User");

class DataAccess {
  constructor() {}

  async findOne(query, collection) {
    return await mongoose.connection.db.collection(collection).findOne(query);
  }

  async addRecord(data, Model) {
    var model = new Model(data);

    model.save(err => {
      if (err) {
        return false;
      }
    });

    return true;
  }

  async getCollection(Model) {
    try {
      var result = await Model.find({});
      return result;
    } catch (err) {
      return false;
    }
  }

  async getSingle(query, Model) {
    return await Model.findOne(query).catch(err => {
      return false;
    });
  }

  async getProfile(id) {
    var user = await User.findById(id);
    return user.userProfile;
  }
}

exports.DataAccess = DataAccess;
