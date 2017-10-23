console.log("app connected")

var app = angular.module('App', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider){
        $urlRouterProvider.otherwise('/404');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home.html',
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/views/404.html'
        })

        $locationProvider.html5Mode(true);
    }])
//     .config(["$httpProvider", function($httpProvider){
//     $httpProvider.interceptors.push("AuthInterceptor");
// }]);
