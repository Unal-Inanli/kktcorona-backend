const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../modules/auth');

router.get('/isAuth', ensureAuthenticated, async (req, res) => {
    res.status(200).send("Authenticated");
});


module.exports = router