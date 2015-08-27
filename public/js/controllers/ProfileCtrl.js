// public/js/controllers/StatsCtrl.js
angular.module('ProfileCtrl', []).controller('ProfileController', function($scope,$rootScope,$http,$location) {
  
 // if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.go = function(path){
    $location.path(path);
  };
  
  $http.get('/getUser?uid=1').success(function(result){
    $scope.age       = result.age;
    $scope.username = result.username;
    $scope.gender    = (result.gender === 'm') ? "Male" : "Female";
    $scope.state     = result.state;
  });
  
  $http.post('/askedQuestions',{'uid':1}).success(function(result){
    console.log(result);
    $scope.askedQuestions = result;
  })
  
  $http.post('/answeredQuestions',{'uid':1}).success(function(result){
    console.log(result);
    $scope.answeredQuestions = result;
  })
});