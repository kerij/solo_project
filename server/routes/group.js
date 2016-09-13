var express = require('express');
var router = express.Router();
var path = require('path');
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res, next) {

  var saveClass = {
    class_name: req.body.class_name,
    period: req.body.period,
    teacher_id: req.body.teacher_id,
    class_desc: req.body.class_desc
  };
  console.log('new class:', saveClass);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO classes (class_name, period, teacher_id, class_desc) VALUES ($1, $2, $3, $4) RETURNING class_id",
      [saveClass.class_name, saveClass.period, saveClass.teacher_id, saveClass.class_desc],
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
