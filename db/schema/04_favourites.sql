DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) on DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) on DELETE CASCADE
);
