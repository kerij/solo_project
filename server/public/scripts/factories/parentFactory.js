myApp.factory('parentFactory', ['$http', function($http) {
  console.log('parent factory running');
  var parentStudents = [];
  var studentClasses = [];

  var getParentStudents = function(parentID){
          console.log('called getParentStudents in factory');
          var promise = $http.get('/getStudent/'+ parentID).then(function(response) {
            parentStudents = response.data;
            return parentStudents;
      });
        return promise;
  };

  var getStudentClasses = function(student){
          console.log('student in the factory:', student);
          console.log('called getStudentClasses in factory');
          var promise = $http.post('/getWeekly', student).then(function(response) {
            studentClasses = response.data;
            return studentClasses;
      });
        return promise;
  };




return {
  parentStudents: function(){
    return parentStudents;
  },
  studentClasses: function(){
    return studentClasses;
  },
  getParentStudents: function(parentID) {
    return getParentStudents(parentID);
  },
  getStudentClasses: function(student) {
    return getStudentClasses(student);
  }
}


}]);
