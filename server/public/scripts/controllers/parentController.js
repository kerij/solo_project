myApp.controller('ParentController', ['$scope', '$http', '$location', 'userFactory', 'loggedinFactory', 'parentFactory', function($scope, $http, $location, userFactory, loggedinFactory, parentFactory) {
  console.log("parent controller working");

  $scope.userFactory = userFactory;
  $scope.loggedinFactory = loggedinFactory;
  $scope.parentFactory = parentFactory;

  $scope.user = {};

  $scope.isLoggedIn = function() {
    loggedinFactory.isLoggedIn().then(function(response) {
      console.log('the id of the person logged in:', response.id)
      $scope.user = response;
      $scope.getParentStudents(response.id);
    });
  }

  $scope.getParentStudents = function(parentID) {
    console.log(parentID);
    parentFactory.getParentStudents(parentID).then(function(response) {
      console.log('This parents kids:', response);
      $scope.parentStudents = response;
    });
  }


  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }

  $scope.getStudentClasses = function(student) {
    console.log(student);
    parentFactory.getStudentClasses(student).then(function(response) {
      console.log('This students classes:', response);
      $scope.studentClasses = response;
    });
  }


}]);
