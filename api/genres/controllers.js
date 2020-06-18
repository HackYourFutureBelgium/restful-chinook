const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM genres`;

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
    const sql = `SELECT * FROM genres where genreId=${Number(id)}`;

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
    const sql = `INSERT INTO genres (
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
    const sql = `UPDATE genres
    SET 
     name = "${newObj.name}"
    WHERE genreId = ${Number(req.params.id)}`;

    db.run(sql, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      
      res.json({ changes: this.changes });
    });
  },
  delete: (req, res) => { 
    const sql = `DELETE FROM genres
    WHERE genreId = ${Number(req.params.id)}`;

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
