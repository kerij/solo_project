var express = require('express');
var router = express.Router();
var path = require('path');

// Handles POST request with new user data
router.post('/', function(req, res, next) {

  var saveUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_type: req.body.user_type
  };
  console.log('new user:', saveUser);

  pg.connect(connection, function(err, client, done) {
    client.query("INSERT INTO students (first_name, last_name, username, password, type) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [saveUser.first_name, saveUser.last_name, saveUser.username, saveUser.password, saveUser.user_type],
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
