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

    client.query("SELECT * FROM students ORDER BY last_name ASC, first_name ASC",
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

router.get('/:parentID', function(req, res) {
  var parentID = req.params.parentID
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT * FROM students WHERE parent1 = $1 OR parent2 = $1",
                  [parentID],
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
