var myApp = angular.module('myApp', ['ui.router']);


myApp.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouteProvider) {

  $urlRouteProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/views/home.html',
      controller: "LoginController"
    })

    .state('admin', {
      url: '/admin',
      templateUrl: '/views/admin.html',
      controller: "AdminController"
    })

    .state('admin.teachers', {
      templateUrl: '/views/templates/addteacher.html',
      // controller: "AdminController" //controller might not be necessary? Inherits from parent?
    })

    .state('admin.classes', {
      templateUrl: '/views/templates/addclass.html',
      // controller: "AdminController"
    })

    .state('admin.parents', {
      templateUrl: '/views/templates/addparent.html',
      // controller: "AdminController"
    })

    .state('admin.students', {
      templateUrl: '/views/templates/addstudent.html',
      // controller: "AdminController"
    })


  // $routeProvider
  //   .when('/home', {
  //     templateUrl: '/views/home.html',
  //     controller: "LoginController"
  //   })
  //
  //   .when('/admin', {
  //     templateUrl: '/views/admin.html',
  //     controller: "adminController"
  //   })
  //   .otherwise({
  //     redirectTo: '/home'
  //   })
}]);
