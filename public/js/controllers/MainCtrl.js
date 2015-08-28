// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope,$http,$location,$rootScope) {
  
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.goProfile = function(uid){
    $location.path('/profile').search({uid:uid})
  }
  
//   $scope.qid        = 1;
//   $scope.asker      = "";
//   $scope.question   = "";
//   $scope.response_1 = "";
//   $scope.response_2 = "";  
//   $scope.errmsg     = "";
  
  $scope.switchQuestion = function(){
    $http.get('/getNewQuestion?uid='+$rootScope.userID).success(function(q_obj){
      if(!q_obj.errmsg){
        $scope.errmsg     = "";
        $scope.question   = q_obj.text;
        $scope.response_1 = q_obj.responses[0];
        $scope.response_2 = q_obj.responses[1];
        $scope.qid        = q_obj._id;
        $scope.askerid    = q_obj.asker;
        $http.get('/getUser?uid='+q_obj.asker).success(function(user){
          $scope.asker      = user.username;
        });
      }
      else{
        $scope.errmsg     = q_obj.errmsg;
        $scope.asker      = "";
        $scope.question   = "";
        $scope.response_1 = "";
        $scope.response_2 = "";
        $scope.qid        = "";
        $scope.askerid    = "";
      }
    });
  };  
  
  $scope.switchQuestion()
  
  $scope.postAns   = function(resp){
    if(!$scope.errmsg){
      var postData = {uid:$rootScope.userID, qid:$scope.qid, response:resp};
      $http.post("/newResponse",postData).
        success(function(data){
          $scope.switchQuestion();    
      }).error (function(data){
      });
    }
  };
  $scope.postTrue  = function(){$scope.postAns(true); };
  $scope.postFalse = function(){$scope.postAns(false);};
});