// public/js/controllers/MainCtrl.js
angular.module('AddQuestionCtrl', []).controller('AddQuestionController', function($scope,$http,$location,$rootScope) {
    
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.tagList = ["Lifestyle","Politics","Movies","Music","Books","TV","Sports","Technology","Opinion"];
  $scope.tagResponses = {};
  
  var setDefaults = function(){
    for(var tag in $scope.tagList){$scope.tagResponses[$scope.tagList[tag]] = false;}
    $scope.text = "";
    $scope.responses = ["",""];
  }  
  
  $scope.postQuestion = function(){
    var tagList = [];
    for(var key in $scope.tagResposnes){$scope.tagResponses[key] ? tagList.push(key) : "";}
    var question = {
      text : $scope.text,
      tags : tagList,
      responses : $scope.responses,
      asker : $rootScope.userID
    };
    $http.post("/addQuestion",question).then(function(response){
      (response.errmsg) ? ($scope.errmsg = response.errmsg) : $location.path("/addQuestion"); 
    });
    setDefaults();
  };
});