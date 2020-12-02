var express = require('express');
var router = express.Router();

router.get('/signup', function(req, res, next) {
  res.status(200).send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.status(200).send('respond with a resource');
});

module.exports = router;
