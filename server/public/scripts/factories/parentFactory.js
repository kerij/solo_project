myApp.factory('parentFactory', ['$http', function($http) {
  console.log('parent factory running');
  var parentStudents = [];

  var getParentStudents = function(parentID){
          console.log('called getParentStudents in factory');
          var promise = $http.get('/getStudent/'+ parentID).then(function(response) {
            parentStudents = response.data;
            return parentStudents;
      });
        return promise;
  };





return {
  parentStudents: function(){
    return parentStudents;
  },
  getParentStudents: function(parentID) {
    return getParentStudents(parentID);
  }
}


}]);
