var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');
var path = require('path');

const upload_dir = path.normalize('./data/uploads/');

router.post('/upload', async function (req, res) {
    let { username } = req.query;
    let file = Object.values(Object.values(req.files)[0])[0];
    try {
        let url = new Date().getTime() + ' - ' + file.name;
        let name = file.name;
        let owner = username;
        let filetype = Object.keys(Object.values(req.files)[0])[0];
        let size = file.size;
        let created_on = new Date();
        await new Promise((resolve, reject) => {
            resolve(file.mv(`${upload_dir}${url}.${filetype}`, (err) => { console.error(err); reject(err) }));
        })
        let query = await db.query('INSERT INTO files(url, name, owner, filetype, size, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING url', [url, name, owner, filetype, size, created_on]);
        res.status(200).json(query.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

router.get('/', async function (req, res) {
    let { username } = req.query;
    try {
        let query = await db.query('SELECT * FROM files WHERE owner = $1', [username]);
        res.status(200).json(query.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

module.exports = router;
