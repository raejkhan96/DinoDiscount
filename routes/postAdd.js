const express = require('express');
const router  = express.Router();

const postAddRoutes = function(db) {


  router.get("/", (req, res) => {

    res.render('post-add');

  });


  router.post("/", (req, res) => {
    const addNewListingParams = [];
    addNewListingParams.push(req.body.title);
    addNewListingParams.push(req.body.price);
    addNewListingParams.push(req.body.description);
    addNewListingParams.push(req.body.picture);
    addNewListingParams.push(req.body.type);
    addNewListingParams.push(req.body.time_period);
    addNewListingParams.push(req.cookies.user_id);

    const query = `
    INSERT INTO listings (name, price, description, picture, type_id, time_period_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
    db.query(query, addNewListingParams)
      .then(queryResult => {
        console.log("New listing insterted into db\n", queryResult.rows)
        res.redirect("/postadd");
      })
      .catch(error => {
        console.log("DB Insert Error:", error.message);
      })

  });



  return router;
};

module.exports = postAddRoutes;
