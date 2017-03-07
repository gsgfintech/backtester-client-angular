'use strict';

angular.module('backtesterclientApp')
.directive('tradesList', function () {
    return {
        templateUrl: 'views/trades-list-template.html',
        restrict: 'E',
        scope: {
            tradesList: '=trades',
            header: '@'
        },
        controller: ['$scope', function ($scope) {
        }]
    };
});
