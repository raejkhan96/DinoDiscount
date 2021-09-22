const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const favoriteRoutes = (db) => {
  console.log("inside favorites");

  router.get("/", (req, res) => {
    const user_id = req.cookies.user_id;
    console.log("req:", req.cookies.user_id);
    let query = `
    SELECT user_favorite.listing_id as favlisting_id, users.id as user_id,users.name as user_name,user_pic, listings.*
    FROM user_favorite
    JOIN users ON user_favorite.user_id = users.id
    JOIN listings ON user_favorite.listing_id = listings.id
    WHERE user_favorite.user_id = $1
    `;
    //;
    db.query(query, [user_id])
    .then(searchResults => {
      const listings = searchResults.rows;
      const templateVars = { listings };
      console.log(templateVars);
      res.render('favorites', templateVars)
    })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
    });


  router.get("/delete/:id", (req, res) => {
    const user_id = req.cookies.user_id;
    const listing_id = req.params.id;
    console.log("delete user_id:", req.cookies.user_id);
    let query = `
    DELETE FROM user_favorite
    WHERE user_id = $1 AND listing_id = $2;
    `;

    db.query(query, [user_id, listing_id])
    .then(searchResults => {
      res.redirect("/favorites");
    })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });
    return router;

}

module.exports = favoriteRoutes;

