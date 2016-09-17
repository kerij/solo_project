var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('./strategies/user.js');
var session = require('express-session');



// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var student = require('./routes/student');
var getTeacher = require('./routes/getTeacher');
var getParent = require('./routes/getParent');
var getClass = require('./routes/getClass');
var getStudent = require('./routes/getStudent');
var getWeekly = require('./routes/getWeekly');
var editClass = require('./routes/editClass');
var editWeekly = require('./routes/editWeekly');
var deleteUser = require('./routes/deleteUser');
var deleteClass = require('./routes/deleteClass');
var group = require('./routes/group');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/student', student);
app.use('/getTeacher', getTeacher);
app.use('/getParent', getParent);
app.use('/getClass', getClass);
app.use('/getStudent', getStudent);
app.use('/getWeekly', getWeekly);
app.use('/editClass', editClass);
app.use('/editWeekly', editWeekly);
app.use('/deleteUser', deleteUser);
app.use('/deleteClass', deleteClass);
app.use('/group', group);
app.use('/*', index);

// App Set //
app.set('port', (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
