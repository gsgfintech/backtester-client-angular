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
        controller: ['$scope', 'CommonsService', function ($scope, CommonsService) {
            $scope.formatRate = function (cross, rate) {
                return CommonsService.formatRate(cross, rate);
            };
        }]
    };
});
