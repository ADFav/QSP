// public/js/controllers/StatsCtrl.js
angular.module('StatsCtrl', []).controller('StatsController', function($scope,$rootScope,$http,$location) {
  
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.go = function(path){
    $location.path(path);
  };
  
  $scope.qid       =  $location.search().qid;
  console.log($scope.qid);
  $scope.question  = "";
  $scope.response_1 = "";
  $scope.response_2 = "";  
  $scope.userid = $rootScope.userID; //THIS IS A HUGE MISTAKE!
  $scope.totalPositive = 0;
  $scope.width_pos = "42%";
  $scope.width_neg = "13%";
  
  var switchQuestion = function(q_id){
    $http.get('/getQuestion?id='+q_id).success(function(q_obj){
      $scope.question   = q_obj[0].text;
      $scope.response_1 = q_obj[0].responses[0];
      $scope.response_2 = q_obj[0].responses[1];
      $scope.qid        = q_obj[0]._id;
    });
  };
  
  switchQuestion($scope.qid);
  var count =0;
  $scope.getResults = function(field, value, value2, valIndex){
    
    var searchQuery = {qid: $scope.qid, field : field, value: value, value_1:value2};
    $http.post('/filterResponses',searchQuery).success(function(results){
      count ++;
      if (parseFloat(results.total) !== 0){
        var result = {pos: "" + (parseFloat(100*results.positive)/parseFloat(results.total)).toFixed(2) + "%",
                      neg: "" + (parseFloat(100*results.negative)/parseFloat(results.total)).toFixed(2) + "%"};}
      else{
        var result = {pos : "0%", neg:"0%"};
      }
      $scope.fieldWidths[field][valIndex][0]= result.pos;
      $scope.fieldWidths[field][valIndex][1]= result.neg;
      count === 9 ? console.log($scope.fieldWidths) : console.log(count);
      
    });
  };
  
  $scope.fieldValues = {'Total' : {" "       :[" "," "]},
                        'Gender': {"Male"    :['m',''],
                                   "Female"  :['f','']},
                        'Age'   : {"Under 18":[0 ,17],
                                  "18-24"   :[18,25],
                                  "25-29"   :[25,29],
                                  "30-39"   :[30,39],
                                  "40-49"   :[40,49],
                                  "50+"     :[50,200]}};

  $scope.fieldWidths = $scope.fieldValues;
  
  for(var field in $scope.fieldValues){
    for(var value in $scope.fieldValues[field]){      
      $scope.getResults(field,$scope.fieldValues[field][value][0],$scope.fieldValues[field][value][1],value);
    }
  }
});