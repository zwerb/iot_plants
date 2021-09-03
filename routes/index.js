var express = require("express");
var router = express.Router();
const path = require('path');
const pool = require(path.join(__dirname, "../database/pool"));
const moment = require('moment');

/* GET home page. */
router.get("/", async function (req, res, next) {
  let queryString = `SELECT * FROM plants ORDER BY id DESC LIMIT 100;`;
  let updates = {};

  console.log(`executing: ${queryString}`);

  try {
    pgResponse = await pool.query(queryString);

    // res.status(200).json(pgResponse.rows);
    updates = pgResponse.rows;
    console.log(updates);

    updates.forEach(row => {
      row.created_at = moment(row.created_at).format("YYYY-MM-DD_hh:mm:ss")
    });

  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }
  //await pool.end();
  // });

  res.render("index", { title: "Plant Life", updates: updates });
});

module.exports = router;
