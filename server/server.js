const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();

//Route Imports
const main = require("../routes/index");
const register = require("../routes/register");
const login = require("../routes/login");
const checkAuth = require("../routes/checkAuth");
const logout = require("../routes/logout");
const setProfile = require("../routes/user/setProfile");
//Passport Config
require("../modules/passport")(passport);

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
};
//Cors
app.use(cors(corsOptions));

//JSON
app.use(express.json());

//Session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.urlencoded({ extended: true }));
//Passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", main);
app.use("/", register);
app.use("/", login);
app.use("/", checkAuth);
app.use("/", logout);
app.use("/user/setProfile", setProfile);

//Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(res => {
    console.log("DB Connected");
  })
  .catch(err => {
    console.log(Error, err.message);
  });

//Server Init
app.listen(process.env.PORT);
