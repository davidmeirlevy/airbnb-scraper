'use strict';

/**
 * @ngdoc function
 * @name guestyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the guestyApp
 */
angular.module('guestyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
