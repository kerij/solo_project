var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solo';


router.put('/:classID', function(req, res, next) {
  var classID = req.params.classID
  var saveDesc = {
    class_desc: req.body.data
  };
  console.log('new description:', saveDesc);

  pg.connect(connectionString, function(err, client, done) {
    client.query("UPDATE classes SET class_desc = $1 WHERE class_id = $2",
      [saveDesc.class_desc, classID],
        function (err, result) {
          client.end();

          if(err) {
            console.log("Error updating data: ", err);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
  });

});




module.exports = router;
