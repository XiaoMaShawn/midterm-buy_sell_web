// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/items", (req, res) => {
    // console.log(`NATHAN NATHAN`, req.params);

    db.query(
      `
      SELECT items.*, users.name AS username
      FROM items
    JOIN users ON users.id = items.owner_id ;
    `
    )
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

  router.get("/:user_id/items", (req, res) => {
    console.log(`THIS BE THE`, req.params);

    db.query(
      `SELECT items.*, users.name AS username
      FROM items
    JOIN users ON users.id = items.owner_id
    WHERE users.id = ${req.params.user_id} ;`
    )
      .then((data) => {
        const items = data.rows;
        const templateVars = {};
        templateVars.items = items;
        templateVars.id = req.session.id;
        templateVars.username = req.session.username;
        res.render("myItems", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/items/:item_id/delete", (req, res) => {
    console.log(`THIS IS CONSOLE`, req);
    db.query(`
    DELETE FROM items
    WHERE id = '${req.params.item_id}';
    `);
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.redirect("back");
  });

  //Mark as sold, only admin has priviledge
  router.post("/items/:item_id/sold", (req, res) => {
    // console.log(`THIS IS CONSOLE`, req);
    db.query(`
    UPDATE items
    SET sold_date = NOW()
    WHERE id = '${req.params.item_id}';
    `);
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.redirect("back");
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

  router.get("/items/new", (req, res) => {
    const templateVars = {};
    templateVars.id = req.session.id;

    templateVars.username = req.session.username;
    res.render("postItems", templateVars);
  });

  router.post("/items", (req, res) => {
    const price = req.body.price ? req.body.price : 0;
    const queryParams = [
      req.body.name,
      req.body.description,
      req.body.photoUrl,
      price,
      req.body.ownerId,
    ];

    let queryString = `
    INSERT INTO items (name, description, photo_url, price, owner_id) VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    db.query(queryString, queryParams)
      .then((data) => {
        // const items = data.rows;
        // const templateVars = {};
        // templateVars.items = items;
        // templateVars.id = req.session.id;
        // templateVars.username = req.session.username;
        res.redirect("/users/items"); //"postItemsResults",  templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
