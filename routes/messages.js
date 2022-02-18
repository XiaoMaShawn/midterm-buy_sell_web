/*
 * All routes for Message are defined here
 * Since this file is loaded in server.js into /messages,
 *   these routes are mounted onto /messages
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(
      `
    SELECT
    users.name as owner,
     items.id AS id,
     items.name AS Item,
     users.name AS Name,
     messages.title AS Title,
     sender.name AS sender,
     messages.content AS Content
    FROM messages
    JOIN items ON items.id = messages.item_id
    JOIN users ON users.id = items.owner_id
    JOIN users sender ON sender.id = messages.from_id
    `
    )
      .then((data) => {
        const templateVars = {};
        templateVars.messages = data.rows;
        templateVars.username = req.session.username;
        templateVars.id = req.session.id;

        res.render("messages", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
//CHANGE TO BE MADE: need to filter to items that tHIS PERSON owns


  router.get("/:id", (req, res) => {
    db.query(
      `
    SELECT
    messages.id AS message_id,
    messages.title AS title,
    messages.from_id AS from_id,
    users.name as owner,
    messages.content AS content,
    messages.sent_at AS sent_at,
    items.name AS item_name,
    users.name AS from,
    sender.name AS sender,
    messages.item_id as item
    FROM messages
    JOIN items ON items.id = messages.item_id
    JOIN users ON users.id = items.owner_id
    JOIN users sender ON sender.id = messages.from_id
    WHERE items.id = ${req.params.id}
    `
    ).then((data) => {
      const templateVars = {};
      templateVars.messages = data.rows;

      templateVars.username = req.session.username;
      templateVars.id = req.session.id;


      res.render("messagesID", templateVars);
    });
  });

  router.get("/:id/chat", (req, res) => {
  console.log("req.params.id", req.param.id)
  db.query(

      `
    SELECT
    messages.id AS message_id,
    messages.title AS title,
    messages.from_id AS from_id,
    messages.content AS content,
    messages.sent_at AS sent_at,
    items.name AS item_name,
    users.name AS owner,
    messages.item_id as item,
    sender.name AS sender
    FROM messages
    JOIN items ON items.id = messages.item_id
    JOIN users ON users.id = items.owner_id
    JOIN users sender ON sender.id = messages.from_id
    WHERE messages.item_id = ${req.params.id}
    `
    ).then((data) => {
      const templateVars = {};
      templateVars.messages = data.rows,
        templateVars.username = req.session.username;
      templateVars.id = req.session.id;

      res.render("chat", templateVars);
      // res.json({messages:templateVar.messages})
    });
  });

  router.post("/:id/chat", (req, res) => {
console.log("req.body", req.body)
// console.log("req.body.from_id", req.body.from_id)
// console.log("req.body.item_id", req.body.item_id)

      db.query(
      `INSERT INTO messages (content, title, from_id,  item_id) VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [req.body.content, req.body.title, req.body.from, req.body.item_id]
    ).then((data) => {
      const templateVars = {};
      templateVars.messages = data.rows;
      // console.log(templateVars);
      res.redirect("/messages");

    });
  });

  //router.get
  return router;
};

// SELECT messages.id AS message_id, messages.title AS title, messages.content AS content, messages.sent_at AS sent_at, items.name AS item_name, users.name AS owner
//     FROM messages
//     JOIN items ON items.id = messages.item_id
//     JOIN users ON owner_id = users.id
//     WHERE messages.id = ${req.params.id}
