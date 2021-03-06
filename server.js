// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: false,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieParser());


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const listingsRoutes = require("./routes/listings");
const myfavoritesRoutes = require("./routes/favorites");
const mylistingsRoutes = require("./routes/mylistings");
const loginRoutes = require("./routes/login");
const messagesRoutes = require("./routes/messages");
const homeRoutes = require("./routes/homeListings");
const postAddRoutes = require("./routes/postAdd");
const dinoCardRoutes = require('./routes/viewCard');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/listings", listingsRoutes(db));
app.use("/favorites", myfavoritesRoutes(db));
app.use("/mylistings", mylistingsRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/messages", messagesRoutes(db));
app.use("/homepage", homeRoutes(db));
app.use("/dinoCard", dinoCardRoutes(db));
app.use("/postadd", postAddRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get('/login/:id', (req, res) => {
//   // cookie-parser
//   res.cookie('user_id', req.params.id);

//   // redirect the client
//   res.redirect('/');
// });

app.get("/", (req, res) => {
  res.redirect("/homepage");
});

app.get("/api/maps", (req, res) => {

  const templateVars = {
    latitude: 51.505,
    longitude: -0.09
  };

  res.render("maps", templateVars);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
