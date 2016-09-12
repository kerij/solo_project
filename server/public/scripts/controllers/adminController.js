myApp.controller('AdminController', ['$scope', '$http', '$location', 'userFactory', function($scope, $http, $location, userFactory) {
  console.log("admin controller working");

  $scope.user = {
      first_name: '',
      last_name: '',
      username: '',
      password: ''
    };
  $scope.message = '';


  $scope.userFactory = userFactory;


  $scope.addUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $scope.user = {
              first_name: '',
              last_name: '',
              username: '',
              password: ''
            };
          $scope.getTeachers();
          $location.path('/admin');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }

    $scope.addClass = function() {
        if($scope.class.class_name == '' || $scope.class.period == '') {
          $scope.message = "Please enter class name and period !";
        } else {
          console.log('sending to server...', $scope.class);
          $http.post('/register', $scope.class).then(function(response) {
            console.log('success');
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

      $scope.deleteUser = function(userID){
        console.log(userID);
        $http.delete('/deleteUser/' + userID).then(function(){
          console.log('delete went through');
          $scope.getTeachers();
        })
      };


}]);
