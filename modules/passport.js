const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/User')
const bycrpt = require('bcrypt');

module.exports  = function(passport) {
    passport.use(new LocalStrategy((username, password, done) => {

        User.findOne({username: username}).then(user => {
            if(!user) return done(null, false, { message: 'User Doesn\'t Exist'})
           

            bycrpt.compare(password, user.password, (err, matched) => {
                if (err) throw err;

                if(matched) {
                    return done(null, user)
                } 

                return done(null, false, "Username / Password Incorrect");
            })

        })

      })      
    );


    passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}