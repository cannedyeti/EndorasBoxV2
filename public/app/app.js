console.log("app connected")

var app = angular.module('App', ['ui.router', 'AppCtrl']);

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
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/views/signup.html',
            controller: 'SignupCtrl'
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
