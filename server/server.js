const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
var http = require("http").createServer(app);
const io = require("socket.io")(http);
require("dotenv").config();

//Route Imports
const main = require("../routes/index");
const register = require("../routes/register");
const login = require("../routes/login");
const checkAuth = require("../routes/checkAuth");
const logout = require("../routes/logout");
const setProfile = require("../routes/user/setProfile");
const getProfile = require("../routes/user/getProfile");
const createListing = require("../routes/user/createListing");
const listingCollection = require("../routes/listing/listingCollection");
const listingSingle = require("../routes/listing/listingSingle");
const getProfileSingle = require("../routes/user/getProfileSingle");
const listingSearch = require("../routes/listing/listingSearch");
//Passport Config
require("../modules/passport")(passport);

var corsOptions = {
  origin: process.env.FRONT_END_URL,
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
app.use("/user", setProfile);
app.use("/user", getProfile);
app.use("/user", createListing);
app.use("/user", getProfileSingle);
app.use("/listing", listingCollection);
app.use("/listing", listingSingle);
app.use("/listing", listingSearch);

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

// Socket Stuff
var users = {};

io.of("/chat").on("connection", function(socket) {
  socket.on("join", function({ id, username }) {
    users[id] = { id: socket.id, username };
    console.log(users[id]);
  });

  socket.on("incomingMessage", function({ fromId, toId, message }) {
    var user = users[fromId];
    console.log(user);
    socket.broadcast
      .to(users[toId].id)
      .emit("messageSent", { from: user, fromId, toId, message });
  });

  socket.on("pm", function({ from, message, room }) {
    socket.broadcast.to(users[room]).emit("receiveMessage", { from, message });
  });

  socket.on("initChat", function({ requesteeId, username, requesterId }) {
    socket.broadcast
      .to(users[requesteeId])
      .emit("createChat", { id: requesterId, username, chatId: requesteeId });
  });
});
//Server Init
http.listen(process.env.PORT, function() {
  console.log(process.env.PORT);
});
