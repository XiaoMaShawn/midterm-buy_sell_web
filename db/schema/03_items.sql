DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  description TEXT,
  photo_url VARCHAR(255),
  price INTEGER,
  list_date TIMESTAMP,
  sold_date TIMESTAMP,
  active BOOLEAN DEFAULT TRUE,
  owner_id INTEGER REFERENCES users(id) on DELETE CASCADE
);
