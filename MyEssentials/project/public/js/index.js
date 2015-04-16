var app = angular.module("musicApp", ['ngRoute','ui.bootstrap', 'ngCookies']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: './home.html',
                controller: 'homeController'
            }).
            when('/listen', {
                templateUrl: './Listen.html',
                controller: 'soundCloudController'
            }).
            when('/watch', {
                templateUrl: './Watch.html',
                controller: 'youtubeAppController'
            }).
            when('/experience', {
                templateUrl: './Concert.html',
                controller: 'concertAppController'
            }).
            when('/signup', {
                templateUrl: './Signup.html',
                controller: 'signUpController'
            }).
            when('/blog', {
                templateUrl: './Blog.html',
                controller: 'blogController'
            }).
            when('/viewblog', {
                templateUrl: './ViewBlog.html',
                controller: 'viewController'
            }).
            when('/profile', {
                templateUrl: './Profile.html',
                controller: 'profileController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);