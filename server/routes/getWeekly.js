var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solo';

router.post('/', function(req, res) {
  console.log('at the server:',req.body);

  var period1 = req.body.period1;
  var period2 = req.body.period2;
  var period3 = req.body.period3;
  var period4 = req.body.period4;
  var period5 = req.body.period5;
  var period6 = req.body.period6;
  var period7 = req.body.period7;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    }

    client.query("SELECT class_name, weekly_update FROM classes WHERE class_id IN ($1, $2, $3, $4, $5, $6, $7) ORDER BY period ASC",
                  [period1, period2, period3, period4, period5, period6, period7],
      function(err, result) {
        console.log('this is the result:', result);
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
