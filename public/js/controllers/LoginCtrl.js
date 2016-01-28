// public/js/controllers/StatsCtrl.js
angular.module('LoginCtrl', []).controller('LoginController', function($scope,$http,$location,$rootScope) {
  
  $scope.errmsg    = "";
  $scope.userID    = $rootScope.userID ? $rootScope.userID : "";
  $scope.activePage = "/home";
  
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
  
      // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
 
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
 
            //     ...
            // Do some work [1].
            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
 
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };
 
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '123132454800-mk76q3qhmamd72u900uii446fdbvtlb7.apps.googleusercontent.com ', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
 
    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };
 
    // Call start function on load.
    $scope.start();
});