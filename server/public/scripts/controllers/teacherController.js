myApp.controller('TeacherController', ['$scope', '$http', '$location', 'userFactory', 'loggedinFactory', 'teacherFactory', function($scope, $http, $location, userFactory, loggedinFactory, teacherFactory) {
  console.log("teacher controller working");

  var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur']

  for (var i = 0; i < events.length; i++) {
        $scope[events[i]] = function(e) {
            console.info('Event type:', e.type);
        }
    };


  $scope.userFactory = userFactory;
  $scope.loggedinFactory = loggedinFactory;
  $scope.teacherFactory = teacherFactory;

  $scope.user = {};
  $scope.teacherClass = {};

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



  $scope.editDesc = function(index, teacherClass) {
    //$scope.teacherClass = {};
    var data = teacherClass.class_desc;
    var classID = teacherClass.class_id;


    console.log('the udpated description:', data);
      if($scope.teacherClass.class_desc == '') {
        // $scope.message = "Class description cannot be empty.";
      } else {
        console.log('sending to server...', teacherClass, classID);
        $http.put('/editClass/' + classID, {data: data}).then(function(response) {
          console.log('success');
          $scope.showDesc = false;

        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }

    $scope.editWeekly = function(index, teacherClass) {

      var data = teacherClass.weekly_update;
      var classID = teacherClass.class_id;

        if($scope.teacherClass.class_desc == '') {
          // $scope.message = "Class description cannot be empty.";
        } else {
          console.log('sending to server...', data);
          $http.put('/editWeekly/' + classID, {data: data}).then(function(response) {
            console.log('success');
            $scope.showWeekly = false;

          },
          function(response) {
            console.log('error');
            $scope.message = "Please try again."
          });
        }
      }

    $scope.logout = function() {
      $http.get('/user/logout').then(function(response) {
        console.log('logged out');
        $location.path("/home");
      });
    }


}]);
