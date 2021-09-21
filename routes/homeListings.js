const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const homeRoutes = function(db) {

  router.get("/", (req, res) => {
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    ORDER BY listings.date_posted DESC
    `;
    db.query(query)
      .then(searchResults => {
        const listings = searchResults.rows;
        const templateVars = {
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
