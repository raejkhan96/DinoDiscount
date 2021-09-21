DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_sender_id INTEGER REFERENCES users(id) NOT NULL,
  listing_id INTEGER REFERENCES listings(id) NOT NULL,
  user_receiver_id INTEGER REFERENCES users(id) NOT NULL,
  message TEXT
);
