var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  let obo = {test:'one',test2:'two'};
  res.send('respond with a resource');
});

module.exports = router;
