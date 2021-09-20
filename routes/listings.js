const express = require('express');
const router  = express.Router();

const listingsRoutes = function(db) {

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
      .then(listings => {
        res.json(listings.rows);
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });

  router.get("/search", (req, res) => {
    const search = {
      type: 'herbivore',
      time_period: 'jurassic',
      min_price: '100000',
      max_price: '',
      most_popular: false,
    }

    const searchParams = [];
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    `;

    if(search.type) {
      searchParams.push(`%${search.type}%`);
      query += `AND types.name ILIKE $${searchParams.length}`
    }

    if(search.time_period) {
      searchParams.push(`%${search.time_period}%`);
      query += `AND time_period.name ILIKE $${searchParams.length}`
    }

    if(search.min_price) {
      searchParams.push(search.min_price);
      query += `AND listings.price >= $${searchParams.length}`
    }

    if(search.max_price) {
      searchParams.push(search.max_price);
      query += `AND listings.price <= $${searchParams.length}`
    }

    if(search.most_popular) {
      query += `ORDER BY listing.visits DESC`
    }

    db.query(query, searchParams)
      .then(searchResults => {
        res.json(searchResults.rows);
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });


  return router;
};

module.exports = listingsRoutes;
