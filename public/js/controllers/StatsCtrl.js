// public/js/controllers/StatsCtrl.js
angular.module('StatsCtrl', []).controller('StatsController', function($scope,$http,$location) {
  
  
  $scope.qid       = $location.search().qid;
  $scope.question  = "";
  $scope.response_1 = "";
  $scope.response_2 = "";  
  $scope.userid = 3; //THIS IS A HUGE MISTAKE!
  $scope.totalPositive = 0;
  $scope.width_pos = "42%";
  $scope.width_neg = "13%";
  
  console.log($location.search());
  
  var switchQuestion = function(q_id){
    $http.get('/questions?id='+q_id).success(function(q_obj){
      $scope.question   = q_obj[0].text;
      $scope.response_1 = q_obj[0].responses[0];
      $scope.response_2 = q_obj[0].responses[1];
      $scope.qid        = q_obj[0]._id;
    });
  };
  
  switchQuestion($scope.qid);
  
  var getPosResults = function(field, value){
    var qid = $scope.qid;
    var query_url = '/filterResponses?qid='+qid+"&field="+field+"&value="+value;
    console.log(query_url);
    $http.get(query_url).success(function(results){
      console.log(query_url,results);
      console.log(parseFloat(results.positive)/parseFloat(results.total));
      $scope.totalPositive = (parseFloat(100*results.positive)/parseFloat(results.total)).toFixed(2);
      $scope.totalNegative = (parseFloat(100*results.negative)/parseFloat(results.total)).toFixed(2);
      console.log($scope.width_pos);
      $scope.width_pos = "" + ($scope.totalPositive) + "%";
      $scope.width_neg = "" + ($scope.totalNegative) + "%";
      console.log($scope.width_pos);
    });
  };
  getPosResults("z","z");
});