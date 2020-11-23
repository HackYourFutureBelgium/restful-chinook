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
    const id = Number(req.params.id);
    const sql= `SELECT * FROM tracks WHERE TrackId = ${id}`

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
    const Name = req.body.Name;
    const AlbumId = req.body.AlbumId;
    const MediaTypeId = req.body.MediaTypeId;
    const GenreId = req.body.GenreId;
    const Composer = req.body.Composer;
    const Milliseconds = req.body.Milliseconds;
    const Bytes = req.body.Bytes;
    const UnitPrice = req.body.UnitPrice;

    const sql = `INSERT INTO tracks (Name, 
                                     AlbumId, 
                                     MediaTypeId, 
                                     GenreId, Composer, 
                                     Milliseconds, 
                                     Bytes, 
                                     UnitPrice)
                   VALUES("${Name}", 
                          "${AlbumId}", 
                          "${MediaTypeId}", 
                          "${GenreId}", 
                          "${Composer}", 
                          "${Milliseconds}", 
                          "${Bytes}", 
                          "${UnitPrice}"
                          )`;

    db.run(sql, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json("The track is successfully added to the database");
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = Number(req.params.id);
    const Name = req.body.Name;
    const AlbumId = req.body.AlbumId;
    const MediaTypeId = req.body.MediaTypeId;
    const GenreId = req.body.GenreId;
    const Composer = req.body.Composer;
    const Milliseconds = req.body.Milliseconds;
    const Bytes = req.body.Bytes;
    const UnitPrice = req.body.UnitPrice;

    const sql = `UPDATE tracks
                 SET Name = '${Name}',
                     AlbumId = ${AlbumId},
                     MediaTypeId = ${MediaTypeId}, 
                     GenreId = ${GenreId},
                     Composer = '${Composer}',
                     Milliseconds = ${Milliseconds},
                     Bytes = ${Bytes},
                     UnitPrice = ${UnitPrice}
                 WHERE TrackId = ${id} `;

    db.run(sql, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json("The track is successfully changed in the database");
    });
  },
  delete: (req, res) => {
    const id = Number(req.params.id);

    const sql = `DELETE FROM tracks 
                 WHERE TrackId = '${id}'`;

    db.run(sql, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json("The track is successfully deleted from the database");
    });
  },
}

module.exports = controllers;
