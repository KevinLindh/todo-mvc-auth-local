//Middleware is the code (functions) that runs between the request and response.

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Passport is middleware for Node.js that makes it easy to implement authentication and authorization.
const passport = require("passport");
//
const session = require("express-session");
//
const MongoStore = require("connect-mongo")(session);
//
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const friendListRoutes = require("./routes/friendList");

require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger("dev"));
// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/friendList", friendListRoutes);
app.use("/addfriend", friendListRoutes);
app.use("/pokefriend", friendListRoutes);
app.use("/deleteFriend", friendListRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
