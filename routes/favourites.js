/*
 * All routes for favourites are defined here
 * Since this file is loaded in server.js into api/favourites,
 *   these routes are mounted onto /favourites
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.name AS User, items.name AS Name, items.description AS description, items.photo_url AS image FROM favourites
    JOIN users ON favourites.user_id = users.id
    JOIN items ON favourites.item_id = items.id`)
      .then(data => {
        const favourites = data.rows;
    const templateVars = {};
    templateVars.favourites = favourites;
    console.log(templateVars)
    res.render("favourites", templateVars)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.post('/:id/delete', (req, res) => {
    console.log('Favourites Remove button hit!')
    db.query(`
    DELETE FROM favourites
    WHERE id = '${req.params.id}';
    `)
    res.redirect('/favourites');
  })


  return router;
};
