const fs = require('fs');
const yaml = require('js-yaml');

let dbCreds = {}

// Gathering Credentials

try {
    let fileContents = fs.readFileSync('../secrets/secrets.yml', 'utf8');
    let data = yaml.load(fileContents);
    dbCreds = data;
    
} catch (e) {
    console.log(e);
}

console.log(dbCreds);

// Database Connection - Pooled Queries

const Pool = require('pg').Pool
const pool = new Pool({
  user: dbCreds.postgres_username,
  host: dbCreds.postgres_host,
  database: dbCreds.postgres_db_name,
  password: dbCreds.postgres_password,
  port: dbCreds.postgres_port,
})