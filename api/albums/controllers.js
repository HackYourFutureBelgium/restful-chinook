const db = require('../db-connection');

const LIMIT = 10;

const controllers = {
    getAll: (req, res) => {

        const sql = `SELECT * FROM albums LIMIT 10`;

        db.all(sql, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }

            res.json(rows)
        });
    },

    /* TOTAL ALBUM QTY */
    countAll: (req, res) => {
        const sql = 'SELECT  COUNT(*) AS qty FROM albums';

        db.get(sql, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(row.qty);
        })
    },
    /* END OF REQUEST */

    /* GET PAGE BY NUMBER */
    getPageByNo: (req, res) => {

        const page = req.params.page - 1;
        const sql = 'SELECT  * FROM albums LIMIT 10 OFFSET ?';

        db.all(sql, page * LIMIT, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(rows);
        })
    },

    /* END OF REQUEST */


    getOne: (req, res) => {

        const sql = 'SELECT * FROM albums WHERE AlbumId = ?';
        const id = req.params.id;

        db.get(sql, id, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json(row)
        })
    },
    create: (req, res) => {
        // read row data from body
    },
    update: (req, res) => {
        // read row data from body
    },
    delete: (req, res) => {}
}

module.exports = controllers;