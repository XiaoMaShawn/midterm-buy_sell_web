// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    const templateVars = {};
    templateVars.id = req.session.id;

    templateVars.username = req.session.username;
    res.render("postItems", templateVars);
  });

  router.post("/", (req, res) => {
    const price = req.body.price ? req.body.price : 0;
    const queryParams = [
      req.body.name,
      req.body.description,
      req.body.photoUrl,
      price,
      req.body.ownerId,
    ];
    // 2
    let queryString = `
    INSERT INTO items (name, description, photo_url, price, owner_id) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    db.query(queryString, queryParams)
      .then((data) => {
        const items = data.rows;
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
          data.rows
        );
        const templateVars = {};
        templateVars.items = items;
        // console.log(templateVars.items);
        templateVars.id = req.session.id;

        templateVars.username = req.session.username;
        res.render("postItemsResults", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //////////////////////////////////////
  return router;
};

// SELECT items.*, users.name AS username FROM items JOIN users ON users.id = items.owner_id WHERE users.name LIKE '%a%';
