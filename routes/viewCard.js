const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const dinoCardRoutes = function(db) {
  router.get("/", (req, res) => {
    const user = req.cookies.user;
    const templateVars = { user };
    res.render("dinoCard", templateVars)
  });

  return router;
}

module.exports = dinoCardRoutes;

