/*
 * All routes for favourites are defined here
 * Since this file is loaded in server.js into api/favourites,
 *   these routes are mounted onto /favourites
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/favourites", (req, res) => {
    db.query(
      `SELECT users.name AS User, items.name AS Name, items.photo_url AS image, favourites.id as id, user_id
      FROM favourites
      JOIN users ON favourites.user_id = users.id
      JOIN items ON favourites.item_id = items.id;`
    )
      .then((data) => {
        const favourites = data.rows;
        // console.log(data.rows);
        // console.log(req.session);
        const templateVars = {};
        if (req.session.id === 1) {
          templateVars.user_id = 1
        } else {
          templateVars.user_id = data.rows[0].user_id
        }
        templateVars.username = req.session.username;
        templateVars.favourites = favourites;
        res.render("favourites", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/favourites", (req, res) => {
    const userID = req.params.id
    db.query(
      `SELECT favourites.id AS ID, items.name AS Name, items.description AS description, items.photo_url AS image, users.name AS user
      FROM favourites
    JOIN users ON favourites.user_id = users.id
    JOIN items ON favourites.item_id = items.id
    WHERE users.id = ${userID}
    GROUP BY favourites.id, items.name, items.description, items.photo_url, users.name;`
    )
      .then((data) => {
        const favourites = data.rows;
        const templateVars = { favourites };

        templateVars.id = req.session.id
        templateVars.username = req.session.username;
        templateVars.favourites = favourites;

        res.render("favouritesUser", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/favourites/:favourite_id/delete", (req, res) => {
    // console.log(req.params.favourite_id);
    db.query(`
    DELETE FROM favourites
    WHERE id = '${req.params.favourite_id}';
    `);
    res.redirect("/users/favourites");
  });

  // router.post('/:id/favourites', (req, res) => {
  //   db.query(`
  //   INSERT INTO favourites (user_id, item_id)
  //   VALUES (${req.params.id},${req.params.item_id} )
  //   `).then(data => {
  //     res.redirect('/users/favourites');
  //   })
  // })

  return router;
};
