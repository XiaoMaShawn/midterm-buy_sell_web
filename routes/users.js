/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
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

  router.get("/:name", (req, res) => {
    db.query(
      `
    SELECT users.*, COUNT(items.*) as total_items
    FROM users
    LEFT JOIN items on users.id = items.owner_id
    WHERE users.name = '${req.params.name}'
    GROUP BY users.id;
    `
    )
      .then((data) => {
        const users = data.rows;
        const templateVars = {};
        templateVars.users = users;
        templateVars.username = req.session.username;
        templateVars.id = req.session.id;

        // console.log(templateVars);
        res.render("usersID", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id/delete", (req, res) => {
    console.log(req.params.id);
    db.query(`
    DELETE FROM users
    WHERE id = '${req.params.id}';
    `);
    res.redirect("/users");
  });

  router.get("/api", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/items", (req, res) => {
    ///RETURNs UNDEFINED
    // BODY IS ONLY FOR POST console.log(`THIS BE THE`, req.body);
    console.log(`THIS BE THE`, req.params);

    db.query(
      `SELECT items.*, users.name AS username
      FROM items
    JOIN users ON users.id = items.owner_id ;`
    )
      .then((data) => {
        const items = data.rows;
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
          data
        );
        const templateVars = {};
        templateVars.items = items;
        // console.log(templateVars.items);
        res.render("items", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
