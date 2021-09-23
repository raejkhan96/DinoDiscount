const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const mylistingsRoutes = (db) => {

  router.get("/", (req, res) => {
    const user = req.cookies.user;
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    WHERE users.id = $1
    ORDER BY listings.date_posted DESC
    `;

    db.query(query, [user.user_id])
    .then(searchResults => {
      const listings = searchResults.rows;
      const templateVars = { user,listings };
      console.log(templateVars);
      res.render('mylistings', templateVars)
    })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
    });


  router.get("/update/:id", (req, res) => {
    const user_id = req.cookies.user.user_id;
    const listing_id = req.params.id;
    console.log("delete user_id:", listing_id);
    let query = `
    UPDATE listings SET sold = TRUE where id = $1;
    `;

    db.query(query, [listing_id])
    .then(searchResults => {
      res.redirect("/mylistings");
    })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });

  router.get("/delete/:id", (req, res) => {
    const user_id = req.cookies.user.user_id;
    const listing_id = req.params.id;
    console.log("delete user_id:", listing_id);
    let query = `
    DELETE FROM listings where id = $1;
    `;

    db.query(query, [listing_id])
    .then(searchResults => {
      res.redirect("/mylistings");
    })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });
    return router;

}

module.exports = mylistingsRoutes;

