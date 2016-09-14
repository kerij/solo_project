myApp.factory('userFactory', ['$http', function($http) {
  console.log('user factory running');

  var teachers = [];
  var parents = [];
  var classes = [];
  var students = [];


  var getTeachers = function(){
          console.log('called getTeachers in factory');
          var promise = $http.get('/getTeacher').then(function(response) {
            teachers = response.data;
            return teachers;
      });
        return promise;
  };

  var getParents = function(){
          console.log('called getParents in factory');
          var promise = $http.get('/getParent').then(function(response) {
            parents = response.data;
            return parents;
          });
      return promise;
  };

  var getClasses = function(){
          console.log('called getClasses in factory');
          var promise = $http.get('/getClass').then(function(response) {
            classes = response.data;
            return classes;
          });
      return promise;
  };

  var getStudents = function(){
          console.log('called getStudents in factory');
          var promise = $http.get('/getStudent').then(function(response) {
            students = response.data;
            return students;
          });
      return promise;
  };




return {
  teachers: function(){
   return teachers;
  },
  parents: function(){
    return parents;
  },
  classes: function(){
    return classes;
  },
  students: function(){
    return students;
  },
  getTeachers: function() {
    return getTeachers();
  },
  getParents: function() {
    return getParents();
  },
  getClasses: function() {
    return getClasses();
  },
  getStudents: function() {
    return getStudents();
  }
};

}]);
