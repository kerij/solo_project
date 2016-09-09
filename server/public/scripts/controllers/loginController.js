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
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/home');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    }
}]);
