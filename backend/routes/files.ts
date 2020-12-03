var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');
var path = require('path');

const upload_dir = path.normalize('./data/uploads/');

router.post('/upload', async function (req, res) {
    let { username } = req.query;
    let body = req.body;
    let file = Object.values(Object.values(req.files)[0])[0];
    console.log({ file });
    try {
        let url = new Date().getTime() + ' - ' + file.name;
        let owner = username;
        let filetype = file.mimetype.split('/').pop();
        let size = file.size;
        let created_on = new Date();
        console.log({ url, owner, filetype, size, created_on })
        let movedFile = await new Promise((resolve, reject) => {
            resolve(file.mv(`${upload_dir}${url}.${filetype}`, (err) => { console.error(err); reject(err) }));
        })
        console.log({ movedFile })
        let query = await db.query('INSERT INTO files(url, owner, filetype, size, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING url', [url, owner, filetype, size, created_on]);
        res.status(200).json(query.rows);
        // res.status(200).json({ message: 'Ok' });
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

module.exports = router;
