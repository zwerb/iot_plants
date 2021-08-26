const path = require('path');
const pool = require('./pool');
const config = require(path.join(__dirname, "../config"));

let postgres_db_name = config.postgres_db_name;
let postgres_table_name = config.postgres_table_name;

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
    `CREATE TABLE ${postgres_table_name}(id SERIAL PRIMARY KEY, name VARCHAR ( 40 ) NOT NULL, metadata JSONB NULL, moisture REAL NULL, temp REAL NULL, light REAL NULL, lat REAL NULL, lng REAL NULL, location VARCHAR ( 40 ), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW() );`;
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

  queryString = `INSERT INTO ${postgres_table_name}(name, metadata, moisture, temp, light, lat, lng, location) VALUES ('${name}', ${safeMetaData}, ${moisture}, ${temp}, ${light}, ${lat}, ${lng}, '${location}');`;
  console.log(`executing: ${queryString}`);

  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  metaData = { moisture: 0.23, temp: 22.3, light: 0.5 };
  safeMetaData = "'" + JSON.stringify(metaData) + "'";

  queryString = `INSERT INTO ${postgres_table_name}(name, metadata, moisture, temp, light, lat, lng, location) VALUES ('${name}', ${safeMetaData}, ${moisture}, ${temp}, ${light}, ${lat}, ${lng}, '${location}');`;
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    // console.log("\x1b[32m", res);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  queryString = `SELECT * FROM ${postgres_table_name};`;
  console.log(`executing: ${queryString}`);
  try {
    res = await pool.query(queryString);
    console.log("\x1b[32m", res.rows);
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", error);
  }

  await pool.end();
}

main();
