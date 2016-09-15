myApp.factory('teacherFactory', ['$http', function($http) {
  console.log('teacher factory running');
  var teacherClasses = [];

  var getTeacherClasses = function(teacherID){
          console.log('called getTeacherClasses in factory');
          var promise = $http.get('/getClass/'+ teacherID).then(function(response) {
            teacherClasses = response.data;
            return teacherClasses;
      });
        return promise;
  };

  var editDesc = function(classID) {
          var promise = $http.put('/')
  }



return {
  teacherClasses: function(){
    return teacherClasses;
  },
  getTeacherClasses: function(teacherID) {
    return getTeacherClasses(teacherID);
  }
}


}]);
