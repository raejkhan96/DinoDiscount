DROP TABLE IF EXISTS user_favorite CASCADE;

CREATE TABLE user_favorite (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  listing_id INTEGER REFERENCES listings(id) NOT NULL
);
