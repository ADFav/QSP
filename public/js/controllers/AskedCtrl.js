// public/js/controllers/MainCtrl.js
angular.module('AskedCtrl', []).controller('AskedController', function($scope,$http,$location,$rootScope) {
  
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.goStats = function(q_id){
    $location.path('/stats').search({qid:q_id});
  };
  
  $scope.responses = {};
  $scope.getQuestions = function(type){
    switch(type.toLowerCase()){
      case "asked":
        $http.post('/askedQuestions',{uid:$rootScope.userID}).then(function(resp){
          $scope.responses = resp.data;
        });
        break;
      case "answered":
         $http.post('/answeredQuestions',{uid:$rootScope.userID}).then(function(resp){
            $scope.responses = resp.data;
         });
        break;
    }
  };  
  if($location.path() === "/askedQuestions") {$scope.getQuestions("asked");}
  if($location.path() === "/answeredQuestions") {$scope.getQuestions("answered");}
  
});