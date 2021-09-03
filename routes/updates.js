const express = require("express");
const router = express.Router();
const path = require("path");
const pool = require(path.join(__dirname, "../database/pool"));
const known_bots = require(path.join(__dirname, "../config")).known_bots;
const web_domain = require(path.join(__dirname, "../config")).web_domain;
const axios = require("axios").default;

let plant_keys = [
  "name",
  "moisture",
  "light",
  "temperature",
  "humidity",
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

router.post("/create", async (req, res) => {
  const bot = req.header("Bot-Token");
  const body = req.body;

  console.log(req.body.name);
  console.log(req.rawHeaders);
  console.log(req.body);

  if (
    (typeof bot === "string" || bot instanceof String) &&
    known_bots.includes(bot)
  ) {
    plant_keys.forEach((key) => {
      if (body[key]) {
        plant_object[key] = body[key];
      }
    });

    if (plant_object.metadata) {
      plant_object.metadata = "'" + JSON.stringify(plant_object.metadata) + "'";
    }

    console.log("Plant object: " + JSON.stringify(plant_object));

    let columns_string = Object.keys(plant_object).join(", ");

    // Wowie - need to make a fucnciton to parse the values into string, int, float, etc.
    // let values_string = Object.values(plant_object).map(val => ((typeof val === "string" || val instanceof String) && isNaN(parseFloat(val)) && isNaN(parseInt(val)) ? "'"+val+"'" : val)).join(", ");
    let values_string = Object.values(plant_object)
      .map((val) =>
        (typeof val === "string" || val instanceof String) &&
        isNaN(parseFloat(val)) &&
        isNaN(parseInt(val))
          ? "'" + val + "'"
          : val
      )
      .join(", ");

    queryString = `INSERT INTO plants(${columns_string}) VALUES (${values_string}) RETURNING name, created_at;`;
    console.log(`executing: ${queryString}`);

    // IF: YOUR BOT TOKEN SIGNALS YOU NEED REMOTE RELAY, SWITCH BOT TOKENS AND RELAY
    if (known_bots[0].includes(bot)) {
      let postBody = plant_object;
      let postHeaders = { headers: { "Bot-Token": known_bots[1] } };
      let postLocation = "https://" + web_domain + "/updates/create";

      try {
        const resp = await axios.post(postLocation, postBody, postHeaders);
        console.log(resp.data);
        res.status(201).send(resp);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    } else {
      // ELSE: DO LOCAL
      try {
        pgResponse = await pool.query(queryString);
        res
          .status(201)
          .send("Created record update: " + JSON.stringify(pgResponse.rows));
      } catch (error) {
        console.log("\x1b[33m%s\x1b[0m", error);
        res.status(200).send("We tried, but couldn't make an update");
      }
    }
  } else {
    res.status(200).send("How are you doing today?");
  }
});

module.exports = router;
