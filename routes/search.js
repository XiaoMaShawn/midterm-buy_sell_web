// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {};
    templateVars.id = req.session.id;
    templateVars.username = req.session.username;
    res.render("search", templateVars);
  });

  router.post("/results", (req, res) => {
    const queryParams = [];

    let queryString = `
    SELECT items.*, users.name AS username
    FROM items
    JOIN users ON users.id = items.owner_id
  `;

    if (req.body.owner) {
      queryParams.push(`%${req.body.owner}%`);
      queryString += `
      WHERE users.name LIKE $${queryParams.length} `;
    }

    if (req.body.itemName) {
      queryParams.push(`%${req.body.itemName}%`);
      if (queryParams.length > 1) {
        queryString += `
        AND items.name LIKE $${queryParams.length} `;
      } else {
        queryString += `
        WHERE items.name LIKE $${queryParams.length} `;
      }
    }
    if (req.body.description) {
      queryParams.push(`%${req.body.description}%`);
      if (queryParams.length > 1) {
        queryString += `
        AND description LIKE $${queryParams.length} `;
      } else {
        queryString += `
        WHERE description LIKE $${queryParams.length} `;
      }
    }

    if (req.body.minPrice) {
      queryParams.push(`${req.body.minPrice}`);
      if (queryParams.length > 1) {
        queryString += `AND price > $${queryParams.length} `;
      } else {
        queryString += `WHERE price > $${queryParams.length} `;
      }
    }

    if (req.body.maxPrice) {
      queryParams.push(`${req.body.maxPrice}`);
      if (queryParams.length > 1) {
        queryString += `AND price < $${queryParams.length} `;
      } else {
        queryString += `WHERE price < $${queryParams.length} `;
      }
    }

    queryString += `
 ORDER BY users.name;
 `;

    console.log(queryString, queryParams);

    db.query(queryString, queryParams)
      .then((data) => {
        const items = data.rows;
        const templateVars = {};
        templateVars.items = items;
        templateVars.id = req.session.id;
        templateVars.username = req.session.username;
        res.render("items", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
