var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');

router.post('/upload', async function (req, res) {
    let { username } = req.query;
    let body = req.body;
    let file = req.files;
    try {
        console.log({ username, body, file });
        // let query = await db.query('INSERT INTO users(username, password, created_on) VALUES ($1, $2, $3) RETURNING username', [username, password, new Date()]);
        // console.log(query.rows);
        res.status(200).json({ message: 'Ok' });
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

module.exports = router;
