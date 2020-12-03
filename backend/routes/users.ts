var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');

router.post('/signup', async function (req, res) {
  let { username, password } = req.body
  try {
    password = hash.generate(password); // Includes dynamic salt
    let query = await db.query('INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3) RETURNING username', [username, password, new Date()]);
    res.status(200).json(query.rows);
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
});

router.get('/login', async function (req, res) {
  let { username, password } = req.query
  try {
    let query = await db.query('SELECT password FROM users WHERE username = $1::text', [username]);
    if (hash.verify(password, query.rows[0].password)) {
      res.status(200).json({ message: 'Ok' });
    } else {
      throw new Error("Username or password not found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
});

module.exports = router;
