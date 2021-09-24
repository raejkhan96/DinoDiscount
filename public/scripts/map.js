




const ck = require('ckey');
const API_KEY = require('../../server.js')

console.log("tesssst", ck.MAP_KEY);


$(document).ready(function() {

});




router.post("/add", (req, res) => {
  const userId = req.cookies.user.user_id
  //const listingId = req.cookies.listing_id;
  const listingId = 8;
  const userMessage = "how are you doing";
//const userMessage = req.body.user_message;
  console.log()
  let getSellerIdQuery =`
  SELECT users.id AS seller_id
  FROM users
  JOIN listings ON listings.user_id = users.id
  WHERE listings.id = $1;
  `;
  let insertMsgQuery =`
     INSERT INTO messagestemp (user_interested, owner_listing)
     VALUES ($1, $2)
     RETURNING *;
     `;
  let insertMsgHistoryQuery =`
     INSERT INTO messagehistory (message_id, sender_id, receiver_id, messages)
     VALUES ($1, $2, $3, $4)
     RETURNING *;
     `;

  db.query(getSellerIdQuery, [listingId])
  .then(queryResult1 => {
    console.log("first then", queryResult1.rows[0].seller_id);
      return queryResult1.rows[0].seller_id;
  })
  .then(sellerID => {
    console.log("sellerID: ", sellerID, "userId:", userId);
    return db.query(insertMsgQuery, [userId, sellerID])
          .then(queryResult2 => {
            console.log("result2:", queryResult2.rows[0])
            console.log("second then", queryResult2.rows[0].id);
            return queryResult2.rows[0];
          })
  })
  .then(results => {
    console.log(results);
    return db.query(insertMsgHistoryQuery, [results.id,userId, results.owner_listing,userMessage])
    .then(queryResult2 => {
      console.log("third then", queryResult2.rows);
      res.send(queryResult2.rows);
    })
  })
  .catch(error => {
    console.log("Query Error:", error.message);
  })


   });


