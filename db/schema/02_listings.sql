-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS listings CASCADE;
CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  date_posted DATE DEFAULT CURRENT_DATE,
  price INTEGER NOT NULL,
  description TEXT,
  picture VARCHAR(255) NOT NULL,
  type_id INTEGER REFERENCES types(id) NOT NULL,
  visits INTEGER DEFAULT 0,
  time_period_id INTEGER REFERENCES time_period(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  sold BOOLEAN DEFAULT FALSE
);

