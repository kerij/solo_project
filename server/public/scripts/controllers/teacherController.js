myApp.controller('TeacherController', ['$scope', '$http', '$location', 'userFactory', 'loggedinFactory', function($scope, $http, $location, userFactory, loggedinFactory) {
  console.log("teacher controller working");

  $scope.userFactory = userFactory;

  $scope.loggedinFactory = loggedinFactory;

  $scope.user = {};

  $scope.isLoggedIn = function() {
    loggedinFactory.isLoggedIn().then(function(response) {
      console.log('The person logged in:', response);
      $scope.user = response;
    });
  }





}]);
