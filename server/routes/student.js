var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connection = require('../modules/connection');

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveStudent = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    parent1: req.body.parent1,
    parent2: req.body.parent2,
    period1: req.body.period1,
    period2: req.body.period2,
    period3: req.body.period3,
    period4: req.body.period4,
    period5: req.body.period5,
    period6: req.body.period6,
    period7: req.body.period7
  };
  console.log('new student:', saveStudent);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO students (first_name, last_name, parent1, parent2, period1, period2, period3, period4, period5, period6, period7) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING student_id",
      [saveStudent.first_name, saveStudent.last_name, saveStudent.parent1, saveStudent.parent2, saveStudent.period1, saveStudent.period2, saveStudent.period3, saveStudent.period4, saveStudent.period5, saveStudent.period6, saveStudent.period7],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
  });

});


module.exports = router;
