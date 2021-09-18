-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  dob DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  post_code VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  user_pic VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


