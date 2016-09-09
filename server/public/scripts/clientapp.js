var myApp = angular.module('myApp', ['ngRoute']);


myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })

    // .when('/user', {
    //   templateUrl: '/views/user.html',
    //   controller: "UserController"
    // })
    .otherwise({
      redirectTo: '/home'
    })
}]);
