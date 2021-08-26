const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const config = { config: ''};

try {
  const read_config = yaml.load(
    fs.readFileSync(path.join(__dirname, "../secrets/secrets.yml"), "utf8")
  );
  config.config = read_config;
} catch (e) {
  console.log(e);
}

module.exports = config.config