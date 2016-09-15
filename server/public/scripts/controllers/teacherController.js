myApp.controller('TeacherController', ['$scope', '$http', '$location', 'userFactory', 'loggedinFactory', 'teacherFactory', function($scope, $http, $location, userFactory, loggedinFactory, teacherFactory) {
  console.log("teacher controller working");

  $scope.userFactory = userFactory;
  $scope.loggedinFactory = loggedinFactory;
  $scope.teacherFactory = teacherFactory;

  $scope.user = {};

  $scope.showDesc = false;
  $scope.showWeekly = false;

  $scope.isLoggedIn = function() {
    loggedinFactory.isLoggedIn().then(function(response) {
      console.log('The person logged in:', response);
      console.log('the id of the person logged in:', response.id)
      $scope.user = response;
      $scope.getTeacherClasses(response.id);
    });
  }

  $scope.getTeacherClasses = function(teacherID) {
    console.log(teacherID);
    teacherFactory.getTeacherClasses(teacherID).then(function(response) {
      console.log('This teachers classes:', response);
      $scope.teacherClasses = response;
    });
  }

  $scope.editDesc = function(classID) {
    teacherFactory.editDesc(classID).then(function(response) {
      console.log('Response', response);
    });
  }




}]);
