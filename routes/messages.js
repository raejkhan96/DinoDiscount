const { Template } = require('ejs');
const express = require('express');
const router  = express.Router();

const messagesRoutes = function(db) {

  router.get("/json", (req, res) => {
    db.query(`SELECT messages.* FROM messages`)
    .then(queryResult => {
        res.json(queryResult.rows)
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })
  });

  router.get("/", (req, res) => {
    const user = req.cookies.user;
    const queryParams = [req.cookies.user.user_id];

    let query = `
    SELECT messages.id AS message_id, messages.user_sender_id AS user_sender_id, messages.listing_id AS listing_id, messages.message AS message, messages.user_receiver_id AS user_receiver_id, users.name AS sender_name
    FROM messages
    JOIN users ON messages.user_sender_id = users.id
    JOIN listings ON messages.listing_id = listings.id
    WHERE messages.user_receiver_id = $1;
    `;

    db.query(query, queryParams)
    .then(queryResult => {
        const userMessages = queryResult.rows
        const templateVars = {
          user,
          userMessages
      };
        // res.json(userMessages)
        res.render("messages", templateVars)
      })
      .catch(error => {
        console.log("Query Error:", error.message);
      })


  });



  router.post("/reply", (req, res) => {
    // console.log(req.body)
    const userId = req.cookies.user_id
    const userMessage = req.body.user_message;
    const messageIdForReply = req.body.message_id;

    const getOriginalMessageSenderFromMessage = function(messageIdForReply) {
      let getSellerIdQuery =`
      SELECT users.id AS orginal_sender_id, messages.listing_id
      FROM users
      JOIN messages ON messages.user_sender_id = users.id
      JOIN listings ON messages.listing_id = listings.id
      WHERE messages.id = $1
      `;
      return db.query(getSellerIdQuery, [messageIdForReply])
        .then(queryResult => {
          return queryResult.rows[0];
        })
        .catch(error => {
          console.log("Query Error:", error.message);
        });
    };

    getOriginalMessageSenderFromMessage(messageIdForReply)
      .then(result => {
      const messageInsertParams = [];
      messageInsertParams.push(userId);
      messageInsertParams.push(result.listing_id);
      messageInsertParams.push(userMessage);
      messageInsertParams.push(result.orginal_sender_id);
      console.log(messageInsertParams);

      let query = `
      INSERT INTO messages (user_sender_id, listing_id, message, user_receiver_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `;
      db.query(query, messageInsertParams)
        .then(queryResult => {
          console.log("Message reply insterted into db\n", queryResult.rows)
          res.redirect("/api/messages");
        })
        .catch(error => {
          console.log("Query Error:", error.message);
        })
    });

  });




  router.post("/", (req, res) => {
    const userId = req.cookies.user_id
    const listingId = req.cookies.listing_id;
    const userMessage = req.body.user_message;

    const getSellerIdFromDb = function(listingId) {
      let getSellerIdQuery =`
      SELECT users.id AS seller_id
      FROM users
      JOIN listings ON listings.user_id = users.id
      WHERE listings.id = $1
      `;
      return db.query(getSellerIdQuery, [listingId])
        .then(queryResult => {
          return queryResult.rows;
          // console.log(queryResult.rows);
        })
        .catch(error => {
          console.log("Query Error:", error.message);
        });
    };

    getSellerIdFromDb(listingId)
      .then(result => {
      const sellerId = result[0].seller_id;
      const messageInsertParams = [];
      messageInsertParams.push(userId);
      messageInsertParams.push(listingId);
      messageInsertParams.push(userMessage);
      messageInsertParams.push(sellerId);
      // console.log(messageInsertParams);

      let query = `
      INSERT INTO messages (user_sender_id, listing_id, message, user_receiver_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `;
      db.query(query, messageInsertParams)
        .then(queryResult => {
          console.log("Message from product page insterted into db\n", queryResult.rows)
          res.redirect("/api/messages");
        })
        .catch(error => {
          console.log("Query Error:", error.message);
        })
    });

  });



  return router;
};

module.exports = messagesRoutes;

