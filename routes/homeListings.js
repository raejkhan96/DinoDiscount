const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const homeRoutes = function(db) {

  router.get("/", (req, res) => {
    const user = req.cookies.user;
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    WHERE listings.sold = false
    ORDER BY listings.id DESC
    `;
    db.query(query)
      .then(searchResults => {
        const listings = searchResults.rows;
        const templateVars = {
          user,
          listings
        };

        res.render('homepage', templateVars)
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });

  return router;
};

module.exports = homeRoutes;
