/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/users", (req, res) => {
    if (req.session.id === 1) {
      db.query(
        `
      SELECT *
      FROM users
      `
      )
        .then((data) => {
          const users = data.rows;
          const templateVars = {};
          templateVars.users = users;
          templateVars.username = req.session.username;
          templateVars.id = req.session.id;
          // console.log(templateVars);
          res.render("users", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      db.query(
        `
      SELECT *
      FROM users
      WHERE name = '${req.session.username}'
      `
      )
        .then((data) => {
          const users = data.rows;
          const templateVars = {};
          templateVars.users = users;
          templateVars.username = req.session.username;
          templateVars.id = req.session.id;

          // console.log(templateVars);
          res.render("users", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  router.get("/users/:id", (req, res) => {
    db.query(
      `
    SELECT users.*, COUNT(items.*) as total_items
    FROM users
    LEFT JOIN items on users.id = items.owner_id
    WHERE users.id = '${req.params.id}'
    GROUP BY users.id;
    `
    )
      .then((data) => {
        const users = data.rows;
        const templateVars = {};
        templateVars.users = users;
        templateVars.username = req.session.username;
        templateVars.id = req.session.id;
        res.render("usersID", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/users/:id/delete", (req, res) => {
    console.log(req.params.id);
    db.query(`
    DELETE FROM users
    WHERE id = '${req.params.id}';
    `);
    res.redirect("/users");
  });

  router.get("/users/api", (req, res) => {
    db.query(`SELECT * FROM users;`)
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
