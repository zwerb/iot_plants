const express = require("express");
const router = express.Router();
const path = require("path");
const pool = require(path.join(__dirname, "../database/pool"));
const known_bots = require(path.join(__dirname, "../config")).known_bots;

let plant_keys = [
  "name",
  "moisture",
  "light",
  "temp",
  "lat",
  "lng",
  "location",
  "metadata",
];
let plant_object = {};

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
  //await pool.end();
});

router.put("/create", async (req, res) => {
  const bot = req.header("Bot-Token");
  const body = req.body;

  console.log(req.body.name);

  if (
    (typeof bot === "string" || bot instanceof String) &&
    known_bots.includes(bot)
  ) {
    plant_keys.forEach((key) => {
      if (body[key]) {
        plant_object[key] = body[key];
      }
    });

    if(plant_object.metadata) {
      plant_object.metadata = "'" + JSON.stringify(plant_object.metadata) + "'";
    }

    console.log(JSON.stringify(plant_object));

    let columns_string = Object.keys(plant_object).join(", ");
    // Wowie - need to make a fucnciton to parse the values into string, int, float, etc.
    let values_string = Object.values(plant_object).map(val => ((typeof val === "string" || val instanceof String) && isNaN(parseFloat(val)) && isNaN(parseInt(val)) ? "'"+val+"'" : val)).join(", ");

    queryString = `INSERT INTO plants(${columns_string}) VALUES (${values_string}) RETURNING name, created_at;`;
    console.log(`executing: ${queryString}`);

    try {
      pgResponse = await pool.query(queryString);
      res.status(201).send("Created record update: " + JSON.stringify(pgResponse.rows));
    } catch (error) {
      console.log("\x1b[33m%s\x1b[0m", error);
      res.status(200).send("We tried, but couldn't make an update");
    }

    


  } else {
    res.status(200).send("How are you doing today?");
  }
});

module.exports = router;
