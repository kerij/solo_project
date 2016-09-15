myApp.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {




    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data.user_type);
            // location works with SPA (ng-route)
            console.log('redirecting to' + response.data.user_type + ' page');
            if (response.data.user_type == 'teacher') {
              $location.path('/teacher');
            } else if (response.data.user_type == 'parent') {
              $location.path('/parent');
            } else if (response.data.user_type == 'admin') {
              $location.path('/admin');
            }
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    }
}]);
