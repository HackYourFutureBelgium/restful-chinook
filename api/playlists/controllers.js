const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM playlists`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      res.json(rows)
    });
  },
  getOne: (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM playlists where PlayListId=${Number(id)}`;

    db.all(sql, (err, rows) => {
      if (err) {

        res.status(400).json({ "error": err.message });
        return;
      }

      res.json(rows)
    });
   },
  create: (req, res) => {
    // read row data from body
    const newObjString = JSON.stringify(req.body);
    
    const newObj = JSON.parse(newObjString.toLocaleLowerCase());

    const sql = `INSERT INTO playlists (
                       name
                   )values("${newObj.name}")`;

    db.run(sql, function (err) {
      if (err) {

        res.status(400).json({ "error": err.message });
        return;
      }
  
      res.json({ lastID: this.lastID });
    });
  },
  update: (req, res) => {
    // read row data from body
    const newObjString = JSON.stringify(req.body);
   
    const newObj = JSON.parse(newObjString.toLocaleLowerCase());
    const sql = `UPDATE playlists
    SET 
     name = "${newObj.name}"
    WHERE playlistid = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
     
      res.json({ changes: this.changes });
    });
  },
  delete: (req, res) => {
    const sql = `DELETE FROM playlists
      WHERE playlistid = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }

      res.json({ deleted: this.changes });
    });
    
   }
}

module.exports = controllers;
