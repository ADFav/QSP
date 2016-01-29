qsp.controller('LoginController', function($scope,$http,$location,$rootScope) {
    
  $scope.errmsg    = "";
  $scope.userID    = $rootScope.userID ? $rootScope.userID : "";
  $scope.activePage = "/home";
  var renderButton = function(){gapi.signin2.render("signinwithgoogle",{"theme":"dark"});};
  renderButton();
  $scope.go = function(path){
    $location.path(path);
    $scope.activePage = path;
  };
  
  $scope.mySubmit = function(){
    var credentials = {uid : $scope.userID, pwd : $scope.password};
    
   $http.post('/login',credentials).then(function(response){
      switch (response.data.message){
        case "wrongUID":
          $scope.errmsg = "That username is not in our database. Please re-enter it";
          break;
        case "wrongPWD":
          $scope.errmsg = "That password does not match that username, please try again";
          break;
        case "success":
          $rootScope.userID = response.data.uid;
          $location.path('/home');
          break;  
        default:
          $scope.errmsg = "";
      }
    });
  };
  
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }
  
  $scope.signUp = function(){
    var credentials = { username : $scope.userName,
                        password : $scope.password,
                        age      : $scope.age,
                        state    : $scope.state,
                        gender   : $scope.gender};
    $http.post('/addUser',credentials).then(function(response){
      $location.path('/home');
    });
  };
});