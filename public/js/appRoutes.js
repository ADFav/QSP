// public/js/appRoutes.js
  angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        }).when('/stats',{
            templateUrl: 'views/stats.html',
            controller: 'StatsController'
    });

    $locationProvider.html5Mode(true);

}]);