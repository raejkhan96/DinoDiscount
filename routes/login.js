const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const loginRoutes = (db) => {

  router.get("/:id", (req, res) => {
    console.log("inside login");
    const user_id = req.params.id;
    res.cookie('user_id', user_id);
    let query = `
    SELECT users.name as user_name,listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    ORDER BY listings.date_posted DESC
    `;
    db.query(query, [req.params.id])
      .then(results => {
        const listings = results.rows;
        const templateVars = {user_id,listings};
        res.render('search-page', templateVars);
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
   });

    return router;

}

module.exports = loginRoutes;

