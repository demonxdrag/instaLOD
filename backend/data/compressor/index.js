var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var jszip = require('jszip');
var db = require('../../bin/db.ts');

const upload_dir = path.normalize('./data/uploads/');

/**
 * @description Function in charge of compressing unzipped files and reinserting them into the database
 */
router.get('/', async function (req, res) {
    try {
        let query = await db.query('SELECT file_id, url FROM files WHERE zip = $1', [false]);
        query.rows.forEach((file) => {
            fs.readFile(`${upload_dir}${file.url}`, function (err, data) {
                if (err) throw err;
                var zip = new jszip();
                zip.file(`${upload_dir}${file.url}`, data);
                zip
                    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                    .pipe(fs.createWriteStream(`${upload_dir}${file.url}.zip`))
                    .on('finish', function () {
                        db.query('UPDATE files SET zip = true WHERE file_id = $1', [file.file_id])
                            .catch((err) => {
                                console.error(err.message);
                            })
                    });
            });
        });
        res.status(200).json({ message: query.rows.length });
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

module.exports = router;