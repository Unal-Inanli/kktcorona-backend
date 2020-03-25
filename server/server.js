const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT)

app.get('/', (req, res) => {
    res.send("Hello World")
})