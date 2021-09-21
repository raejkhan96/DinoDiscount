const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const messagesRoutes = function(db) {

  router.post("/", (req, res) => {
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    `;
    res.send('test')



  });

  return router;
};

module.exports = messagesRoutes;

