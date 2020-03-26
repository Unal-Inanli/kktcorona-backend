const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../modules/auth');

router.get('/', ensureAuthenticated ,async (req, res) => {

    res.send('yeet')
});


module.exports = router