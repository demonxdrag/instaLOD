var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');

router.post('/signup', async function (req, res, next) {
  let { username, password } = req.body // This is to prevent any other values to be sent
  try {
    password = hash.generate(password); // Includes dynamic salt
    let print = await db.query('INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3)', [username, password, new Date()]);
    console.log(print);
    res.status(200).json(print);
  } catch (err) {
    console.error(err.message)
    return next({ message: err.message })
  }
});

router.get('/login', async function (req, res, next) {
  let { username, password } = req.body // This is to prevent any other values to be sent
  try {
    let print = await db.any('SELECT password FROM users WHERE username=$1', [username]);
    console.log(print)
    if (hash.verify(password, print.password)) {
      res.status(200).send('respond with a resource');
    } else {
      throw new Error("Username or password not found");
    }
  } catch (err) {
    console.error(err.message)
    return next({ message: err.message })
  }
});

module.exports = router;
