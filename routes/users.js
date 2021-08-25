const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = {'user-01':'bill','user-02':'ted'}
  res.json(users);
});

router.put('/', function(req, res, next) {
  console.log(req);
  res.json(req.body);
});

module.exports = router;
 