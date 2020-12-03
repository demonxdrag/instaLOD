var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var db = require('../bin/db.ts');
var fs = require('fs');
var path = require('path');
var { slugify } = require('../helpers.ts')

const upload_dir = path.normalize('./data/uploads/');

/**
 * @description Gets all files for a user
 */
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

/**
 * @description Uploads a file
 */
router.post('/', async function (req, res) {
    let { username } = req.query;
    let file = Object.values(Object.values(req.files)[0])[0];
    try {
        let name = Object.keys(req.files)[0];
        let owner = username;
        let filetype = Object.keys(Object.values(req.files)[0])[0];
        let size = file.size;
        let url = `${new Date().getTime()}-${slugify(name)}.${filetype}`;
        let created_on = new Date();
        await new Promise((resolve, reject) => {
            resolve(file.mv(`${upload_dir}${url}`, (err) => { console.error(err); reject(err) }));
        })
        let query = await db.query('INSERT INTO files(url, name, owner, filetype, size, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [url, name, owner, filetype, size, created_on]);
        res.status(200).json(query.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

/**
 * @description Updates a given file's metadata
 */
router.put('/', async function (req, res) {
    try {
        let { file_id } = req.query;
        if (file_id) {
            let { name, filetype, size } = req.body;
            let last_edit = new Date();
            let query = await db.query('UPDATE files SET name = $2, filetype = $3 , size = $4, last_edit = $5 WHERE file_id = $1', [file_id, name, filetype, size, last_edit]);
            res.status(200).json(query.rows);
        } else {
            throw new Error("Field file_id missing");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
})

/**
 * @description Deletes a file from the database
 */
router.delete('/', async function (req, res) {
    try {
        let { file_id } = req.query;
        if (file_id) {
            let queryGet = await db.query('SELECT url FROM files WHERE file_id = $1', [file_id]);
            let fileToDelete = queryGet.rows[0];
            let queryDelete = await db.query('DELETE FROM files WHERE file_id = $1', [file_id]);
            res.status(200).json(queryDelete.rows);
            // This section goes last so we can still delete even if there is a failure
            try {
                fs.unlinkSync(`${upload_dir}${fileToDelete.url}`);
                if (fileToDelete.zip) {
                    fs.unlinkSync(`${upload_dir}${fileToDelete.url}.zip`);
                }
            } catch (err) {
                console.error(err.message);
            }
        } else {
            throw new Error("Field file_id missing");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
})

module.exports = router;
