'use strict';

/**
 * @ngdoc overview
 * @name guestyApp
 * @description
 * # guestyApp
 *
 * Main module of the application.
 */
angular
    .module('guestyApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngGrid',
        'guesty.services'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
