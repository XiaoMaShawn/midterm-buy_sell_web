// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/results", (req, res) => {
    const queryParams = [];
    // 2
    let queryString = `
    SELECT items.*, users.name AS username
    FROM items
  JOIN users ON users.id = items.owner_id
  `;

    // 3
    if (req.body.name) {
      queryParams.push(`%${req.body.name}%`);
      const test = `WHERE users.name LIKE $${queryParams.length}`;
      queryString += test;
      console.log(test);
    }

    if (req.body.description) {
      queryParams.push(`%${req.body.description}%`);
      if (queryParams.length > 0) {
        queryString += `AND description = $${queryParams.length} `;
      } else {
        queryString += `WHERE description = $${queryParams.length} `;
      }
    }

    // if (options.minimum_price_per_night) {
    //   queryParams.push(`${options.minimum_price_per_night}`);
    //   if (queryParams.length > 0) {
    //     queryString += `AND cost_per_night > $${queryParams.length} `;
    //   } else {
    //     queryString += `WHERE cost_per_night > $${queryParams.length} `;
    //   }
    // }

    // if (options.maximum_price_per_night) {
    //   queryParams.push(`${options.maximum_price_per_night}`);
    //   if (queryParams.length > 0) {
    //     queryString += `AND cost_per_night <  $${queryParams.length} `;
    //   } else {
    //     queryString += `WHERE cost_per_night <  $${queryParams.length} `;
    //   }
    // }

    // 4
    // queryParams.push(limit);
    // 5
    console.log(queryString, queryParams);

    // 6
    // return pool
    //   .query(queryString, queryParams)
    //   .then((res) => res.rows)
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    ///////////////////////////////////
    // console.log("req.body", req.body);
    db.query(queryString, queryParams)
      .then((data) => {
        const items = data.rows;
        const templateVars = {};
        templateVars.items = items;
        // console.log(templateVars.items);
        res.render("results", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

    //////////////////////////////////////
  });
  return router;
};
