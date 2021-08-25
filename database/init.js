const fs = require("fs");
const yaml = require("js-yaml");

let dbCreds = {};

// Gathering Credentials

try {
  let fileContents = fs.readFileSync("../secrets/secrets.yml", "utf8");
  let data = yaml.load(fileContents);
  dbCreds = data;
} catch (e) {
  console.log(e);
}

// Database Connection - Pooled Queries

const Pool = require("pg").Pool;
const pool = new Pool({
  user: dbCreds.postgres_username,
  host: dbCreds.postgres_host,
  database: dbCreds.postgres_db_name,
  password: dbCreds.postgres_password,
  port: dbCreds.postgres_port,
});

async function main() {
  let queryString = "DROP TABLE IF EXISTS plants";
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  queryString =
    "CREATE TABLE plants(id SERIAL PRIMARY KEY, name VARCHAR ( 40 ) NOT NULL, metadata JSONB NULL, moisture REAL NULL, temp REAL NULL, light REAL NULL, lat REAL NULL, lng REAL NULL, location VARCHAR ( 40 ), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() );";
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  let name = 'plantbot-101';
  let moisture = 0.24;
  let temp = 22.5;
  let light = 0.7;
  let lat = 37.7879;
  let lng = -122.4075;
  let location = 'dZXhjwts' 
  let metaData = { lat, lng };
  let safeMetaData = "'" + JSON.stringify(metaData) + "'";

  queryString = `INSERT INTO plants(name, metadata, moisture, temp, light, lat, lng, location) VALUES ('${name}', ${safeMetaData}, ${moisture}, ${temp}, ${light}, ${lat}, ${lng}, '${location}');`;
  console.log(`executing: ${queryString}`);

  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  metaData = { moisture: 0.23, temp: 22.3, light: 0.5 };
  safeMetaData = "'" + JSON.stringify(metaData) + "'";

  queryString = `INSERT INTO plants(name, metadata, moisture, temp, light, lat, lng, location) VALUES ('${name}', ${safeMetaData}, ${moisture}, ${temp}, ${light}, ${lat}, ${lng}, '${location}');`;
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  queryString = `SELECT * FROM plants;`;
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  await pool.end();
}

main();
