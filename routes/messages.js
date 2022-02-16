/*
 * All routes for Message are defined here
 * Since this file is loaded in server.js into /messages,
 *   these routes are mounted onto /messages
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`
    SELECT *
    FROM messages
    JOIN items ON items.id = messages.item_id;
    `)
      .then(data => {
        const templateVar = {};
        templateVar.messages = data.rows;
        templateVar.username = req.session.username;
        templateVar.id = req.session.id

        res.render("messages", templateVar);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });


  });

  router.get('/:id', (req, res) => {
    db.query(`
    SELECT messages.id AS message_id, messages.title AS title, messages.content AS content, messages.sent_at AS sent_at, items.name AS item_name, users.name AS owner
    FROM messages
    JOIN items ON items.id = messages.item_id
    JOIN users ON owner_id = users.id
    WHERE messages.id = ${req.params.id}
    `).then(data => {
      const templateVar = {};
      templateVar.messages = data.rows;
      templateVar.username = req.session.username;
      templateVar.id = req.session.id

      // console.log(templateVar);
      res.render('messagesID', templateVar)
    })
  });

  router.get('/:id/chat', (req, res) => {
    db.query(`
    SELECT messages.id AS message_id, messages.title AS title, messages.content AS content, messages.sent_at AS sent_at, items.name AS item_name, users.name AS owner
    FROM messages
    JOIN items ON items.id = messages.item_id
    JOIN users ON owner_id = users.id
    WHERE messages.id = ${req.params.id}
    `).then(data => {
      const templateVar = {
        messages: data.rows
      };
// data.rows;
      // console.log(templateVar);
      res.render('chat', templateVar)
      // res.json({messages:templateVar.messages})
    })
  });


  router.post('/:id/chat', (req, res) => {
    console.log(req.body)
    db.query(`INSERT INTO messages (content, title, from_id,  item_id) VALUES ($1, $2, $3, $4) RETURNING *
    `, [req.body.content, "title1", 3,  1]).then(data => {
      const templateVar = {};
      templateVar.messages = data.rows;
      // console.log(templateVar);
      res.redirect('/messages')
      // res.render('chat', templateVar)
    })
  });


//router.get
  return router;
};

// SELECT messages.id AS message_id, messages.title AS title, messages.content AS content, messages.sent_at AS sent_at, items.name AS item_name, users.name AS owner
//     FROM messages
//     JOIN items ON items.id = messages.item_id
//     JOIN users ON owner_id = users.id
//     WHERE messages.id = ${req.params.id}
