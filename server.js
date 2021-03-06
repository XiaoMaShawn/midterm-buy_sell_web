// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// require the cookie-session
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() => {
  console.log("database connected");
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
//use the cookieSession
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const favouritesRoutes = require("./routes/favourites");
const itemsRoutes = require("./routes/items");
const searchRoutes = require("./routes/search");
const messagesRoutes = require("./routes/messages");

const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", favouritesRoutes(db));
app.use("/users", itemsRoutes(db));
app.use("/search", searchRoutes(db));
app.use("/", usersRoutes(db));
app.use("/messages", messagesRoutes(db));

// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  // const templateVars = {};
  // templateVars.id = req.session.id;
  // templateVars.username = req.session.username;
  res.redirect("/users/items");
});

app.post("/login", (req, res) => {
  if (req.body.username === "Admin") {
    req.session.id = 1;
    req.session.username = req.body.username;
  } else {
    req.session.id = 2;
    req.session.username = req.body.username;
  }
  console.log(req.session);
  res.redirect(`/users/${req.session.id}/items`);
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
