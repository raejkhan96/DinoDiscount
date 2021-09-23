const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const loginRoutes = (db) => {

  router.get("/:id", (req, res) => {
    console.log("inside login");
    const user_id = req.params.id;

    let query = `
      select * from users where id = $1;
    `;

    db.query(query, [user_id])
      .then(results => {
        const user_name = results.rows[0].name;
        const user = {user_id,user_name};
        res.cookie('user', user);
        res.redirect("/homepage");
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })

   });

    return router;

}

module.exports = loginRoutes;

