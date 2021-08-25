const fs = require("fs");
const yaml = require("js-yaml");
const path = require('path');

let dbCreds = {};

try {
  const config = yaml.load(fs.readFileSync(path.join(__dirname, '../secrets/secrets.yml'), 'utf8'));
  dbCreds = config;
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


module.exports = pool;