const express = require("express");
const router = express.Router();
const path = require("path");
const pool = require(path.join(__dirname, "../database/pool"));

/* GET updates listing. */
router.get("/", async function (req, res, next) {
  let queryString = `SELECT * FROM plants;`;
  console.log(`executing: ${queryString}`);
  try {
    pgResponse = await pool.query(queryString);
    res.status(200).json(pgResponse.rows);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }
  await pool.end();
});

router.put("/", function (req, res, next) {
  console.log(req);
  res.json(req.body);
});


module.exports = router;
