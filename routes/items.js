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
    db.query(`SELECT * FROM items;`)
      .then((data) => {
        const items = data.rows;
        const templateVars = {};
        templateVars.items = items;
        console.log(templateVars.items);
        res.render("items", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/api", (req, res) => {
    db.query(`SELECT * FROM items;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
