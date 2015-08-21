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
                     positive : "" + ((pos+neg) > 0 ? (pos*100.0 / (pos+neg)) + "%" : "--"),
                     negative : "" + ((pos+neg) > 0 ? (neg*100.0 / (pos+neg)) + "%" : "--")  };
  }
  
  $http.post('/filterResponses',{qid : $scope.qid, queries:$scope.queries}).success(function(results){
    $scope.fieldWidths = {};
    results.forEach(function(result){
     (result.field in $scope.fieldWidths) ? $scope.fieldWidths[result.field].push(convertToPercentages(result)) : $scope.fieldWidths[result.field] = [convertToPercentages(result)]; 
    });
    console.log($scope.fieldWidths);
  });
});