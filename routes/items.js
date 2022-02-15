// /*
//  * All routes for Users are defined here
//  * Since this file is loaded in server.js into api/users,
//  *   these routes are mounted onto /users
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT items.*, users.name AS username
      FROM items
    JOIN users ON users.id = items.owner_id;`
    )
      .then((data) => {
        const items = data.rows;
        const templateVars = {};
        templateVars.items = items;
        console.log(templateVars.items);
        res.render("items", templateVars);
        // res.json({ items });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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

  return router;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

// $(document).ready(function () {
//   $(".tweet-submit-container").hide();
//   $(".validation-error").hide();
//   loadTweets();

//   $(".write-tweet").click(function () {
//     if ($(".tweet-submit-container").is(":hidden")) {
//       $(".tweet-submit-container").slideDown("slow", function () {});
//     } else {
//       $(".tweet-submit-container").slideUp("slow", function () {});
//     }
//   });
// });

// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

// const createTweetElement = (tweets) => {
//   const layout = `<article class="article-container">
//   <header class="tweet-header">
//     <div class="profileDisplayNameOnTweet">
//       <img class="profilePic" src ="${tweets.user.avatars}">
//       <span class="profileName">${tweets.user.name}</span>
//     </div>
//     <div>
//       <span class="twitter-handle">${tweets.user.handle}</span>
//     </div>
//   </header>
//   <main>
//     <div class = "tweet-text-container">
//       <p>
//       ${escape(tweets.content.text)}
//       </p>
//     </div>
//   </main>
//   <footer>
//     <div>${timeago.format(new Date(tweets.created_at))}</div>
//     <div>
//       <span>
//         <i class="fas fa-flag"></i>
//       </span>
//       <span>
//         <i class="fas fa-retweet"></i>
//       </span>
//       <span>
//         <i class="fas fa-heart"></i>
//       </span>
//     </div>
//   </footer>
//   </article>`;
//   return layout;
// };

// const renderTweets = (tweetData) => {
//   tweetData.forEach((tweet) => {
//     $(".new-tweets-container").prepend(createTweetElement(tweet));
//   });
// };

// const loadTweets = () => {
//   $.get("/tweets", (tweets) => {
//     renderTweets(tweets);
//   });
// };

////////////////////////////////////////////////////////////////////////////////////////////////////
