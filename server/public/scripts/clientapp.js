var myApp = angular.module('myApp', ['ui.router', 'angularTrix']);

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

    .state('teacher', {
      url: '/teacher',
      templateUrl: '/views/teacher.html',
      controller: "TeacherController"
    })

    .state('parent', {
      url: '/parent',
      templateUrl: '/views/parent.html',
      controller: "ParentController"
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


}]);
