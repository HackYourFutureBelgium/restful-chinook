const db = require('../db-connection');

const controllers = {
  getAll: (req, res) => {

    const sql = `SELECT * FROM tracks`;

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
    const sql = `SELECT * FROM tracks WHERE trackId=${Number(id)}`

    db.all(sql,(err,rows)=>{
      if(err){
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows)
    });
   },
  create: (req, res) => {

    // read row data from body
    const newObjString = JSON.stringify(req.body);
    
    const newObj = JSON.parse(newObjString.toLocaleLowerCase());

    const sql = `INSERT INTO tracks (
      Name,
      AlbumId,
      MediaTypeId,
      GenreId,
      Composer,
      Milliseconds,
      Bytes,
      UnitPrice
  )values("${newObj.name}",${newObj.albumid}, ${newObj.mediatypeid}, ${newObj.genreid}, "${newObj.composer}", ${newObj.milliseconds}, ${newObj.bytes}, ${newObj.unitprice})`;
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
    const sql = `UPDATE tracks
    SET 
    Name = "${newObj.name}",
    AlbumId =${newObj.albumid} ,
    MediaTypeId =${newObj.mediatypeid} ,
    GenreId = ${newObj.genreid},
    Composer = "${newObj.composer}",
    Milliseconds = ${newObj.milliseconds},
    Bytes =${newObj.bytes} ,
    UnitPrice = ${newObj.unitprice}
WHERE trackId = ${Number(req.params.id)}`;
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
      WHERE tracks = ${Number(req.params.id)}`;

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
