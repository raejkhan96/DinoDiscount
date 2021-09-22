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
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const listingsRoutes = require("./routes/listings");
const favoritesRoutes = require("./routes/favorites");
const loginRoutes = require("./routes/login");
const messagesRoutes = require("./routes/messages");
const homeRoutes = require("./routes/homeListings");
const dinoCardRoutes = require('./routes/viewCard.js');
const postAddRoutes = require("./routes/post-add");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/listings", listingsRoutes(db));
//app.use("/:user_id/favorites", favoritesRoutes(db));
app.use("/favorites", favoritesRoutes(db));
// app.use("/login", loginRoutes(db));
app.use("/api/listings", listingsRoutes(db));
app.use("/api/messages", messagesRoutes(db));
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
  user_id = req.params.user_id;
  //console.log("req session:", req.session);
  res.render("index", {user_id});
});

// app.get("/dinoCard", (req, res) => {
//   res.render("dinoCard");
// });


app.get('/login/:id', (req, res) => {
  // cookie-parser
  res.cookie('user_id', req.params.id);

  // redirect the client
  res.redirect('/homepage');
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
