var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');

router.post('/signup', async function (req, res, next) {
  let { username, password } = req.body // This is to prevent any other values to be sent
  try {
    password = hash.generate(password); // Includes dynamic salt
    let print = await db.query('INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3) RETURNING username', [username, password, new Date()]);
    console.log(print.rows);
    res.status(200).json(print.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
});

router.get('/login', async function (req, res, next) {
  let { username, password } = req.query // This is to prevent any other values to be sent
  console.log({ username, password })
  try {
    let print = await db.query('SELECT password FROM users WHERE username = $1::text', [username]);
    console.log(print.rows)
    if (hash.verify(password, print.rows[0].password)) {
      res.status(200).send('Ok');
    } else {
      throw new Error("Username or password not found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
});

module.exports = router;
