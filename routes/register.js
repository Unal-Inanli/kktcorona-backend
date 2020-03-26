const express = require('express');
const router = express.Router();
const { UserManager } = require('../classes/UserManager');
const { DataAccess } = require('../classes/DataAccess');


var userManager = new UserManager();
var dataAccess = new DataAccess();

router.post('/register', async (req, res) => {
    let user = await dataAccess.findOne({username: req.body.username}, 'users');
    if (user === null) {
        await userManager.RegisterUser(req.body.username, req.body.password);
        res.sendStatus(201)
    } else {
        res.sendStatus(409)
    }
   
});

module.exports = router