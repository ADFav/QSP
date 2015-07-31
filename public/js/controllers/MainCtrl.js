// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {
  
  $scope.qid       = 1;
  $scope.question  = "";
  $scope.response_1 = "";
  $scope.response_2 = "";  
  $scope.userid = 1; //THIS IS A HUGE MISTAKE!
  
  var switchQuestion = function(q_id){
    $http.get('/questions?id='+q_id).success(function(q_obj){
      $scope.question   = q_obj[0].text;
      $scope.response_1 = q_obj[0].responses[0];
      $scope.response_2 = q_obj[0].responses[1];
      $scope.qid        = q_obj[0]._id;
    });
  };  
  
  switchQuestion($scope.qid)
  
  $scope.postAns   = function(resp){
    $http.post("/newResponse",{uid:$scope.userid,qid:$scope.qid,response:resp}).
      success(function(data){
        console.log(data);
        switchQuestion($scope.qid+1);    
    }).
      error (function(data){
        console.log(data);
    })
  };
  $scope.postTrue  = function(){$scope.postAns(true);};
  $scope.postFalse = function(){$scope.postAns(false);};
});