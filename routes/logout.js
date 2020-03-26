const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../modules/auth');

router.get('/logout', ensureAuthenticated, async (req, res) => {
    req.logout();
    res.sendStatus(200);
});


module.exports = router