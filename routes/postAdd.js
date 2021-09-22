const express = require('express');
const router  = express.Router();

const postAddRoutes = function(db) {


  router.get("/", (req, res) => {

    res.render('post-add')

    db.query(query, messageInsertParams)
      .then(queryResult => {
        console.log("Message reply insterted into db\n", queryResult.rows)
        res.redirect("/api/messages");
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })

  });


  router.post("/", (req, res) => {
    const addNewListingParams = [];
    addNewListingParams.push(req.body.title);
    addNewListingParams.push(req.body.price);
    addNewListingParams.push(req.body.description);
    addNewListingParams.push(req.body.picture);
    addNewListingParams.push(req.body.type);
    addNewListingParams.push(req.body.time_period);

    const query = `
    INSERT INTO listings (name, price, description, picture, type_id, time_period_id, user_id, visits)

    RETURNING *;
    `;

    res.send(addNewListingParams)

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
