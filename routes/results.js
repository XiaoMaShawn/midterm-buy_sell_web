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
    SELECT items.*, users.name
    FROM items
    JOIN users ON users.id = items.owner_id
  `;
    // console.log(queryParams, `queryParams`, queryParams.length);

    // 3
    if (req.body.owner) {
      queryParams.push(`%${req.body.owner}%`);
      queryString += `
      WHERE users.name LIKE $${queryParams.length} `;
      // console.log(test);
    }
    // console.log(queryParams, `queryParams`, queryParams.length);
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
    // if (options.maximum_price_per_night) {
    //   queryParams.push(`${options.maximum_price_per_night}`);
    //   if (queryParams.length > 0) {
    //     queryString += `AND cost_per_night <  $${queryParams.length} `;
    //   } else {
    //     queryString += `WHERE cost_per_night <  $${queryParams.length} `;
    //   }
    // }

    // 4
    queryString += `
 ORDER BY users.name;
 `;

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
        console.log(
          "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
          data.rows
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

  //////////////////////////////////////
  return router;
};

// SELECT items.*, users.name AS username FROM items JOIN users ON users.id = items.owner_id WHERE users.name LIKE '%a%';
