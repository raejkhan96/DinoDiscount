const { Template } = require('ejs');
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
    // console.log("##Test", req.query);

    const search = {
      name: req.query.name,
      type: req.query.type,
      time_period: req.query.time_period,
      min_price: req.query.min_price,
      max_price: req.query.max_price,
      most_views: req.query.most_views,
      most_recent: req.query.most_recent
    };

    const searchParams = [];
    let query = `
    SELECT listings.*, types.name AS type, time_period.name AS time_period, users.name AS posted_user
    FROM listings
    JOIN types ON listings.type_id = types.id
    JOIN time_period ON listings.time_period_id = time_period.id
    JOIN users ON listings.user_id = users.id
    `;

    if(search.name) {
      searchParams.push(`%${search.name}%`);
      query += `AND listings.name ILIKE $${searchParams.length}`
    }

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

    if(search.most_views) {
      query += `ORDER BY listings.visits DESC`
    }

    if(search.recent) {
      query += `ORDER BY listings.date_posted DESC`
    }


    db.query(query, searchParams)
      .then(searchResults => {
        const listings = searchResults.rows;
        // res.json(listings);
        const templateVars = {
          listings
        };

        res.render('search-page', templateVars)
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });

  return router;
};

module.exports = listingsRoutes;
