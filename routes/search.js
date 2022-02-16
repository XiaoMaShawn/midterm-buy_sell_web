// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(
//       `SELECT items.*, users.name AS username
//       FROM items
//     JOIN users ON users.id = items.owner_id;`
//     )
//     .then((data) => {
//       const searchCriteria = data.rows;
//     console.log(
//       "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",
//       data
//     );
//     const templateVars = {};
//     templateVars.searchCriteria = searchCriteria;
//     // console.log(templateVars.items);
//     res.render("search", templateVars);
//     // res.json({ items });
//   })
//     .catch((err) => {
//       res.status(500).json({ error: err.message });
//     });
//   // });

//   router.post("/items", (req, res) => {
//     // console.log(`THIS IS CONSOLE`, req);
//     db.query(`
//     SELECT items.*, users.name AS username
//     FROM items
//     JOIN users ON users.id = items.owner_id;
//     `);
//     res.redirect("/items");
//   });

//   router.get("/api", (req, res) => {
//     db.query(`SELECT * FROM items;`)
//       .then((data) => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });

//   return router;
// };

module.exports = (db) => {
  router.get("/", (req, res) => {
    // db.query(
    //   `SELECT items.*, users.name AS username
    //   FROM items
    // JOIN users ON users.id = items.owner_id;`
    // )
    //   .then((data) => {
    //     const searchCriteria = data.rows;
    //     const templateVars = {};
    //     templateVars.searchCriteria = searchCriteria;
    res.render("search"); //, templateVars);
    // res.json({ items });
  });
  // .catch((err) => {
  //   res.status(500).json({ error: err.message });
  // });
  // });
  return router;
};

// router.get("/items", (req, res) => {
//   // console.log(`THIS IS CONSOLE`, req);
//   db.query(
//     `SELECT items.*, users.name AS username
//   FROM items
// JOIN users ON users.id = items.owner_id
// WHERE users.id = 1;`
//   );
//   res.redirect("/items");
// });

//   router.get("/api", (req, res) => {
//     db.query(`SELECT * FROM items;`)
//       .then((data) => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });

// module.exports = (db) => {

// const searchItems = (options, limit = 10) => {
//   // 1
//   const queryParams = [];
//   // 2
//   let queryString = `
//   SELECT items.*, users.name AS username
//   FROM items
//   JOIN users ON users.id = items.owner_id
//  `;

//   // 3
//   if (options.name) {
//     queryParams.push(`%${options.name}%`);
//     queryString += `WHERE city LIKE $${queryParams.length} `;
//   }

// if (options.owner_id) {
//   queryParams.push(`%${options.owner_id}%`);
//   if (queryParams.length > 0) {
//     queryString += `AND owner_id = $${queryParams.length} `;
//   } else {
//     queryString += `WHERE owner_id = $${queryParams.length} `;
//   }
// }

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
//   queryParams.push(limit);
//   queryString += `
//  GROUP BY items.id
//  LIMIT $${queryParams.length};
//  `;

//   // 5
//   console.log(queryString, queryParams);

//   // 6
//   return pool
//     .query(queryString, queryParams)
//     .then((res) => res.rows)
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

// router.get("/items", (req, res) => {
//   database
//     .searchItems(req.query, 20)
//     .then((properties) => res.send({ properties }))
//     .catch((e) => {
//       console.error(e);
//       res.send(e);
//     });
// });

//   return router;
// };

// exports.searchItems = searchItems;
