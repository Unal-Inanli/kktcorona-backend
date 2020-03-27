const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");

require("dotenv").config();

class UserManager {
  constructor() {}

  async RegisterUser(data) {
    await bcrypt.genSalt(10, async (err, salt) => {
      if (err) throw err;
      await bcrypt.hash(data.password, salt, async (err, pw) => {
        data.password = pw;
        var model = new User(data);

        let result = await model.save(err => {
          if (err) {
            console.log(err);
          }
        });
        return result;
      });
    });
  }

  async setProfile(id, data) {
    let result = await User.findByIdAndUpdate(
      id,
      { hasProfile: true, userProfile: data },
      (err, res) => {
        if (err) return err;
      }
    );

    return result;
  }
}

exports.UserManager = UserManager;
