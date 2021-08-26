const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.body.name);
  res.json(JSON.stringify(req.header('User-Agent'))+' '+JSON.stringify(req.body));
});

router.put('/', function(req, res, next) {
  console.log(req);
  res.json(req.body);
});

module.exports = router;
 