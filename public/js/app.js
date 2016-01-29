// public/js/app.js
var qsp = angular.module('qsp', ['ngRoute','MainCtrl','StatsCtrl','AskedCtrl','ProfileCtrl','AddQuestionCtrl']);
qsp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        }).when('/stats',{
            templateUrl: 'views/stats.html',
            controller: 'StatsController'
        }).when('/home',{
            templateUrl: 'views/home.html',
            controller: 'MainController'
        }).when('/addQuestion',{
            templateUrl: 'views/addQuestion.html',
            controller: 'AddQuestionController'
        }).when('/addUser',{
            templateUrl: 'views/addUser.html',
            controller: 'LoginController'
        }).when('/askedQuestions',{
            templateUrl: 'views/askedQuestions.html',
            controller: 'AskedController'
        }).when('/answeredQuestions',{
            templateUrl: 'views/askedQuestions.html',
            controller: 'AskedController'
        }).when('/profile',{
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        });
    $locationProvider.html5Mode(true);
}]);