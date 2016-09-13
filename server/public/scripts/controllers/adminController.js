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
          if($scope.user.username == '' || $scope.user.password == '') {
            $scope.message = "Choose a username and password!";
          } else {
            console.log('sending to server...', $scope.user);
            $http.post('/student', $scope.user).then(function(response) {
              console.log('success');
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

      $scope.deleteUser = function(userID){
        console.log(userID);
        $http.delete('/deleteUser/' + userID).then(function(){
          console.log('delete went through');
          $scope.getTeachers();
          $scope.getParents();
        })
      }

      $scope.deleteClass = function(classID){
        console.log(classID);
        $http.delete('/deleteClass/' + classID).then(function(){
          console.log('delete went through');
          $scope.getClasses();
        })
      }


}]);
