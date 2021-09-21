const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const messagesRoutes = function(db) {


  router.get("/", (req, res) => {
    const queryParams = [req.cookies.user_id];

    let query = `
    SELECT messages.user_sender_id AS user_sender_id, messages.listing_id AS listing_id, messages.message AS message, listings.user_id AS user_receiver_id, users.name AS sender_name
    FROM messages
    JOIN users ON messages.user_sender_id = users.id
    JOIN listings ON messages.listing_id = listings.id
    WHERE listings.user_id = $1;
    `;

    db.query(query, queryParams)
    .then(queryResult => {
        const userMessages = queryResult.rows
        const templateVars = {
          userMessages
      };
        // res.json(userMessages)
        res.render("messages", templateVars)
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })


  });


  router.post("/", (req, res) => {
    const userId = req.cookies.user_id
    const listingId = req.cookies.listing_id;
    const userMessage = req.body.user_message;

    let getSellerIdQuery =`
    SELECT users.id AS seller_id
    FROM users
    JOIN listings ON listings.user_id = users.id
    WHERE listings.id = $1
    `;
    let sellerId;
    db.query(getSellerIdQuery, [listingId])
      .then(queryResult => {
        sellerId = queryResult.rows;
        console.log(sellerId);
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      });

    const messageInsertParams = [];
    messageInsertParams.push(userId);
    messageInsertParams.push(listingId);
    messageInsertParams.push(userMessage);
    console.log(sellerId);

    let query = `
    INSERT INTO messages (user_sender_id, listing_id, message, user_receiver_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    // db.query(query, messageInsertParams)
    //   .then(queryResult => {
    //     console.log("Message insterted into db\n", queryResult.rows)
    //     res.redirect("/api/messages");
    //   })
    //   .catch(error => {
    //     console.log("Query Error:", error.message);
    //   })
  });

  return router;
};

module.exports = messagesRoutes;

