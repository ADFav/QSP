// public/js/controllers/StatsCtrl.js
angular.module('StatsCtrl', []).controller('StatsController', function($scope,$rootScope,$http,$location) {
  
  if(!$rootScope.userID) {$location.path('/login');}
  
  $scope.go = function(path){
    $location.path(path);
  };
  
  $scope.qid       =  $location.search().qid;
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
  
 $scope.queries = [{field: 'Total' , description : "",         val1 : "",  val2 : ""},
                   {field: 'Gender', description : "Male",     val1 : "m", val2 : ""},
                   {field: 'Gender', description : "Female",   val1 : "f", val2 : ""},
                   {field: 'Age'   , description : "Under 18", val1 : 0,   val2 : 18},
                   {field: 'Age'   , description : "18-24",    val1 : 18,  val2 : 25},
                   {field: 'Age'   , description : "25-29",    val1 : 25,  val2 : 30},
                   {field: 'Age'   , description : "30-39",    val1 : 30,  val2 : 40},
                   {field: 'Age'   , description : "40-49",    val1 : 40,  val2 : 50},
                   {field: 'Age'   , description : "50+",      val1 : 50,  val2 : 200}
                   ]; 
  

  $scope.fieldWidths = {};
  
  var convertToPercentages = function(obj){
    var pos = obj.positive, neg  = obj.negative;
    return result = {description : obj.description, 
                     positive : "" + ((pos+neg) > 0 ? (pos*100.0 / (pos+neg)).toFixed(2) + "%" : ""),
                     negative : "" + ((pos+neg) > 0 ? (neg*100.0 / (pos+neg)).toFixed(2) + "%" : "--"),
                     posRatio : "" + ((pos+neg) > 0 ? (pos + "/" + (pos+neg)) : "--"),
                     negRatio : "" + ((pos+neg) > 0 ? (neg + "/" + (pos+neg)) : "--")};
  }
  
  $http.post('/filterResponses',{qid : $scope.qid, queries:$scope.queries}).success(function(results){
    $scope.fieldWidths = {};
    results.forEach(function(result){
     (result.field in $scope.fieldWidths) ? $scope.fieldWidths[result.field].push(convertToPercentages(result)) : $scope.fieldWidths[result.field] = [convertToPercentages(result)]; 
    });
  });
});