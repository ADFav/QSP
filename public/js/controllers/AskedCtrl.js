// public/js/controllers/MainCtrl.js
angular.module('AskedCtrl', []).controller('AskedController', function($scope,$http,$location,$rootScope) {
  
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.goStats = function(q_id){
    console.log(q_id);
    $location.path('/stats').search({qid:q_id});
  };
  
  $scope.responses = {};
  $scope.getQuestions = function(){
    $http.post('/askedQuestions',{uid:$rootScope.userID}).then(function(resp){
      $scope.responses = resp.data;
      console.log($scope.responses);
    });
  };  
  $scope.getQuestions();
});