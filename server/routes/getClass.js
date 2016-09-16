var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solo';

router.get('/', function(req, res) {

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM classes",
      function(err, result) {
        console.log('what up');
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        console.log('results: ', result);
        res.send(result.rows);
    });

  });
});

router.get('/:teacherID', function(req, res) {
  var teacherID = req.params.teacherID
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM classes WHERE teacher_id = $1 ORDER BY class_id ASC",
                  [teacherID],
      function(err, result) {
        console.log('what up');
        done();

        if(err) {
          console.log("select error: ", err);
          res.sendStatus(500);
        }
        console.log('results: ', result);
        res.send(result.rows);
    });

  });
});


module.exports = router;
