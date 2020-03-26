const express = require('express');
const router = express.Router();
const { UserManager } = require('../classes/UserManager');
const { DataAccess } = require('../classes/DataAccess');
const passport = require('passport');

var userManager = new UserManager();
var dataAccess = new DataAccess();

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.send({ username: req.user.username, id: req.user._id });
});

router.get('/login', (req, res) => {
   
    res.send("hi");
});


module.exports = router