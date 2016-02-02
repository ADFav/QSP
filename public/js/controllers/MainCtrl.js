// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope,$http,$location,$rootScope) {
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.goProfile = function(uid){$location.path('/profile').search({uid:uid});};
   
  $scope.switchQuestion = function(){
    $http.get('/getNewQuestion?uid='+$rootScope.userID).success(function(q_obj){
      if(!q_obj.errmsg){
        $scope.question_object = q_obj;
        $http.get('/getUser?uid='+q_obj.asker).success(function(user){
          $scope.asker = user.username;
        });
      }
      else{
       $scope.question_object = {"_id" : -1, "asker" : -1, "text": "", "responses" : ["", ""], "errmsg": q_obj.errmsg};
        $scope.asker = "";
      }
    });
  };  
  
  $scope.question_object = {"_id" : -1, "asker" : -1, "text": "", "responses" : ["", ""], "errmsg": ""};
  $scope.switchQuestion()
  
  $scope.postAns = function(resp){
    if(!$scope.errmsg){
      var postData = {uid:$rootScope.userID, qid:$scope.question_object._id, response:resp};
      $http.post("/newResponse",postData).success(function(data){
          $scope.switchQuestion();    
      }).error (function(data){});
    }
  };
  $scope.postTrue  = function(){$scope.postAns(true); };
  $scope.postFalse = function(){$scope.postAns(false);};
  $scope.abstain   = function(){$scope.postAns();     };
});