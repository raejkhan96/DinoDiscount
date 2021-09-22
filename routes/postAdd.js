const express = require('express');
const router  = express.Router();

const postAddRoutes = function(db) {


  router.post("/", (req, res) => {

    db.query(query, messageInsertParams)
      .then(queryResult => {
        console.log("Message reply insterted into db\n", queryResult.rows)
        res.redirect("/api/messages");
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })

  });



  return router;
};

module.exports = postAddRoutes;
