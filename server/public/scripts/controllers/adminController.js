myApp.controller('AdminController', ['$scope', '$http', '$location', 'userFactory', function($scope, $http, $location, userFactory) {
  console.log("admin controller working");

  $scope.user = {
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    };
  $scope.class = {
      class_name: '',
      period: '',
      teacher: '',
      class_desc: ''
    };
  $scope.student = {
      first_name: '',
      last_name: '',
      parent1: '',
      parent2: '',
      period1: '',
      period2: '',
      period3: '',
      period4: '',
      period5: '',
      period6: '',
      period7: ''
  }
  $scope.message = '';


  $scope.userFactory = userFactory;

  $scope.teachers = userFactory.teachers


  $scope.addUser = function() {
      var data = $scope.user;
      data.whole_name = $scope.user.last_name + ', ' + $scope.user.first_name;
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', data);
        $http.post('/register', data).then(function(response) {
          console.log('success');
          $scope.user = {
              first_name: '',
              last_name: '',
              username: '',
              password: ''
            };
          $scope.getTeachers();
          $scope.getParents();
          $location.path('/admin');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }

    $scope.addClass = function() {
      var data = $scope.class;
      data.teacher_id = $scope.class.teacher.id;
      console.log(data);
        if($scope.class.class_name == '' || $scope.class.period == '') {
          $scope.message = "Please enter class name and period !";
        } else {
          console.log('sending to server...', data);
          $http.post('/group', data).then(function(response) {
            console.log('success');
            $scope.class = {
                class_name: '',
                period: '',
                teacher: '',
                class_desc: ''
              };
            $scope.getClasses();
            $location.path('/admin');
          },
          function(response) {
            console.log('error');
            $scope.message = "Please try again."
          });
        }
      }

      $scope.addStudent = function() {
          var data = $scope.student
          data.parent1 = $scope.student.parent1.id;
          data.parent2 = $scope.student.parent2.id;
          data.period1 = $scope.student.period1.class_id;
          data.period2 = $scope.student.period2.class_id;
          data.period3 = $scope.student.period3.class_id;
          data.period4 = $scope.student.period4.class_id;
          data.period5 = $scope.student.period5.class_id;
          data.period6 = $scope.student.period6.class_id;
          data.period7 = $scope.student.period7.class_id;
          if($scope.student.first_name == '' || $scope.student.last_name == '') {
            $scope.message = "First and last names are required!";
          } else {
            console.log('sending to server...', $scope.student);
            $http.post('/student', $scope.student).then(function(response) {
              console.log('success');
              $scope.student = {
                  first_name: '',
                  last_name: '',
                  parent1: '',
                  parent2: '',
                  period1: '',
                  period2: '',
                  period3: '',
                  period4: '',
                  period5: '',
                  period6: '',
                  period7: ''
              }
              $location.path('/admin');
            },
            function(response) {
              console.log('error');
              $scope.message = "Please try again."
            });
          }
        }

      $scope.getTeachers = function() {
        userFactory.getTeachers().then(function(response) {
          console.log('The teachers:', response);
          $scope.teachers = response;
        });
      }

      $scope.getClasses = function () {
        userFactory.getClasses().then(function(response) {
          console.log('The classes:', response);
          $scope.classes = response;
        });
      }

      $scope.getParents = function() {
        userFactory.getParents().then(function(response) {
          console.log('The parents:', response);
          $scope.parents = response;
        });
      }

      $scope.getStudents = function() {
        userFactory.getStudents().then(function(response) {
          console.log('The stuents:', response);
          $scope.students = response;
        });
      }

      $scope.deleteUser = function(userID){
        console.log(userID);
        $http.delete('/deleteUser/' + userID).then(function(){
          console.log('delete went through');
          $scope.getTeachers();
          $scope.getParents();
        });
      }

      $scope.deleteClass = function(classID){
        console.log(classID);
        $http.delete('/deleteClass/' + classID).then(function(){
          console.log('delete went through');
          $scope.getClasses();
        });
      }

      $scope.logout = function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path("/home");
        });
      }


}]);
