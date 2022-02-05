/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const cookieID = req.session["users_id"];
    console.log(cookieID)
    db.query(`SELECT beverages.name, beverages.description, beverages.price, beverages.thumbnail_url, beverages.posted_at FROM favourites JOIN users ON users.id = user_id JOIN beverages ON beverages.id = beverage_id WHERE users.id = ${cookieID};`)
      .then(data => {
        const beverages = data.rows;
        console.log(beverages)
        const templateVars = {beverages}
        res.render("favourites", templateVars);
      })
      .catch(err => {
        console.log("YOLO")
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};


// .then(data => {
//   const users = data.rows;
//   res.json({ users });
// })
// .catch(err => {
//   res
//     .status(500)
//     .json({ error: err.message });
// });
// });
// return router;
// };