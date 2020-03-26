const User = require('../db/models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

require('dotenv').config();


class UserManager {

    constructor() {

    }


    SignInUser(req, res, next) {
        passport.authenticate('local', {
            successMessage: "Success",
            failureMessage: "Failed"
        })(req, res, next);
    }

    async RegisterUser(username, password) {

        await bcrypt.genSalt(10, async (err, salt) => {
            if (err) throw err;
            await bcrypt.hash(password, salt, async (err, pw) => {
                var model = new User({ username: username, password: pw });

                let result = await model.save((err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                return result;
            });
        });

    }

    LogoutUser() {

    }

}


exports.UserManager = UserManager