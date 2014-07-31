'use strict';

/**
 * @ngdoc function
 * @name guestyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the guestyApp
 */
angular.module('guestyApp')
  .controller('MainCtrl', function ($scope) {

        $scope.myData = [{name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}];
        $scope.gridOptions = { data: 'myData' };


  });
