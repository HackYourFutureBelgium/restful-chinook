const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM artists`;

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
    const sql = `SELECT * FROM artists where ArtistID=${Number(id)}`;

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

    console.log(newAlbum);
    const sql = `INSERT INTO artists (
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
    const sql = `UPDATE artists
    SET 
     name = "${newObj.name}"
    WHERE artistid = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      //return the last id if the table 
      res.json({ changes: this.changes });
    });
  },
  delete: (req, res) => {
    
    const sql = `DELETE FROM artists
    WHERE artistid = ${Number(req.params.id)}`;

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
