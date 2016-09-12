myApp.factory('userFactory', ['$http', function($http) {
  console.log('user factory running');

  // var teachers = [];



  //===============GET TEACHERS========================
    var getTeachers = function(){
            console.log('called getTeachers in factory')
            var promise = $http.get('/getTeacher').then(function(response) {
            teachers = response.data;
            return teachers;
      });
        return promise;
  };



return {
  // teachers: function(){
 //   return teachers;
  // },
  getTeachers: function() {
    return getTeachers();
  }
};

}]);
