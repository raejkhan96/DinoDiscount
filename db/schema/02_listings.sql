-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_posted DATE DEFAULT CURRENT_DATE,
  price INTEGER NOT NULL,
  description TEXT,
  picture VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  visits INTEGER DEFAULT 0,
  time_period VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  sold BOOLEAN DEFAULT FALSE
);

